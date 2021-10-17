import {Component, OnInit, ViewChild} from '@angular/core';
import {BsModalService, ModalDirective} from 'ngx-bootstrap/modal';
import {NotificationsService, NotificationType} from 'angular2-notifications';
import {GlobalService} from '../../../shared/global.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import Swal from "sweetalert2";
import {PageChangedEvent} from 'ngx-bootstrap/pagination';
import {NgForm} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import { CustomersService } from './customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customers:any = [];
  customersTemp:any = [];
  selectedCustomer:any = [];
  isEdit = false;
  responseWaiting = '';
  buttonDisabled = false;
  searchValue = '';
  description = '';
  isSubmitted = false;
  customersCount = 0;
  pageNo = 1;
  pageSize = '10';
  showImage = false;
  @ViewChild('customerForm') customerForm: NgForm;

  constructor(private modalService: BsModalService,
    private notifications: NotificationsService,
    private globeService: GlobalService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private customerService : CustomersService) { }

  ngOnInit(): void {
    this.getAllCustomers();
    this.getAllCustomersForSearch();
  }
  getAllCustomers() {
    this.spinner.show();
    this.customerService.getAllCustomers(this.pageNo, this.pageSize).subscribe( response => {
      this.customers = response["customers"];
      this.customersCount = response["customersCount"];
      this.spinner.hide();
    }, err => {
      this.onError(err.message);
      this.spinner.hide();
    });
  }

  getAllCustomersForSearch() {
    this.spinner.show();
    this.customerService.getAllCustomers(0, "all").subscribe( response => {
      this.customersTemp = response["customers"];
      this.spinner.hide();
    }, err => {
      this.onError(err.message);
      this.spinner.hide();
    });
  }

  onSuccess(content) {
    this.notifications.create('Success', content, NotificationType.Success, { theClass: 'outline primary', timeOut: 6000, showProgressBar: true });
  }
  onError(content) {
    this.notifications.create('Error', content, NotificationType.Error, { theClass: 'outline primary', timeOut: 6000, showProgressBar: true });
  }

  searchTable() {
    this.spinner.show();
    const val =  this.searchValue;
    if(val == null){
      setTimeout(() => { this.spinner.hide();}, 500);
    }
    this.customers = this.customersTemp;
    if(val !== null){
      const filterCustomer= this.customers.filter(function (customer) {
        return customer.customerName.toLowerCase().indexOf(val.toLowerCase()) !== -1  ||
        customer.city.toLowerCase().indexOf(val.toLowerCase()) !== -1  ;
      });
      this.customers = filterCustomer;
      setTimeout(() => { this.spinner.hide();}, 500);
    }
  }

  clear() {
    this.searchValue = null;
    this.getAllCustomers();
  }

  pageChanged(event: PageChangedEvent) {
    this.pageNo = event.page;
    this.getAllCustomers();
  }

  pageSizeChange(event) {
    this.pageSize = event;
    this.getAllCustomers();
  }

  openEditCustomerModel(customerModal: any, key: number) {
    this.isEdit = true;
    this.isSubmitted = false;
    this.responseWaiting = '';
    this.selectedCustomer = this.customers[key];
    customerModal.show();
  }

  openCustomerModel(customerModal: any) {
    this.isEdit = false;
    this.isSubmitted = false;
    this.responseWaiting = '';
    this.selectedCustomer = [];
    customerModal.show();
  }

  clearModel(customerModal: ModalDirective, customerForm: NgForm) {
    customerModal.hide();
    customerForm.resetForm();
    if(this.isEdit){
      this.getAllCustomers();
    }
  }
  addCustomerSubmit(customerModal: ModalDirective, customerForm: NgForm) {
    if(this.isEdit){
      this.buttonDisabled = false;
      if (!this.customerForm.valid || this.buttonDisabled) {
        this.isSubmitted = true;
        return;
      }

      this.buttonDisabled = true;
      this.responseWaiting = 'show-spinner';
      this.spinner.show();

      this.customerService.editCustomer(customerForm.value).subscribe(response => {
        this.responseWaiting = '';
        customerModal.hide();
        this.getAllCustomers();
        this.spinner.hide();
        this.buttonDisabled = false;
        this.onSuccess('Customer Updated');
      }, err => {
        this.spinner.hide();
        this.buttonDisabled = false;
        this.onError(err.message);
        this.globeService.unauthorizedRequest(err.status);
      });
    }else{
      this.buttonDisabled = false;
      if (!this.customerForm.valid || this.buttonDisabled) {
        this.isSubmitted = true;
        return;
      }

      this.buttonDisabled = true;
      this.responseWaiting = 'show-spinner';
      this.spinner.show();

      this.customerService.saveCustomer(customerForm.value).subscribe(response => {
        this.responseWaiting = '';
        customerModal.hide();
        this.reset();
        this.getAllCustomers();
        this.spinner.hide();
        this.buttonDisabled = false;
        this.onSuccess('Customer Added');
      }, err => {
        this.spinner.hide();
        this.buttonDisabled = false;
        this.onError(err.message);
        console.log(err);
        this.globeService.unauthorizedRequest(err.status);
      });
    }
  }

  reset() {
    this.isEdit = false;
    this.isSubmitted = false;
    this.responseWaiting = '';
    this.selectedCustomer = [];
  }

  deleteCustomer(key, id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you need delete this Customer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.customerService.deleteCustomer(id).subscribe(response => {
          this.spinner.hide();
          if (response['status'] === 'success') {
            this.customers.splice(key, 1);
            this.onSuccess('Customer Deleted.');
            this.getAllCustomers();
          } else {
            this.onError('Error Deleting Customer');
          }
        }, err => {
          this.spinner.hide();
          this.onError(err.message);
          this.globeService.unauthorizedRequest(err.status);
        });
      }
    });
  }

}
