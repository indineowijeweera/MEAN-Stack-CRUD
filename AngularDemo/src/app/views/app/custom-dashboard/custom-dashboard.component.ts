import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BsModalService, ModalDirective} from 'ngx-bootstrap/modal';
import {NotificationsService, NotificationType} from 'angular2-notifications';
import {GlobalService} from '../../../shared/global.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import Swal from "sweetalert2";
import {CustomDashboardService} from './custom-dashboard.service';
import {Color, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Colors} from '../../../constants/colors.service';
import {NgForm} from '@angular/forms';
import {PageChangedEvent} from 'ngx-bootstrap/pagination';
import {Lightbox} from 'ngx-lightbox';



@Component({
  selector: 'app-promotion-dashboard',
  templateUrl: './custom-dashboard.component.html',
  styleUrls: ['./custom-dashboard.component.scss']

})
export class CustomDashboardComponent implements OnInit {
  allCounts:any;
  underReview:any = [];
  approved:any = [];
  rejected:any = [];
  suspended:any = [];
  categories:any = [];
  activityLogs:any = [];
  listingsChart:any = [];

  listings:any = [];
  __listings:any = [];
  selectedListing:any = [];
  isEdit = false;
  responseWaiting = '';
  buttonDisabled = false;
  searchValue = '';
  description = '';
  isSubmitted = false;
  listings_count = 0;
  pageNo = 1;
  pageSize = "10";
  adminStatus = "all";
  @ViewChild('statusForm') statusForm: NgForm;
  imagesLightBox: any = [];

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Ads' },
  ];
  public lineChartLabels: Label[] = [];
  // public lineChartOptions: { responsive: boolean } = {
  //   responsive: true,
  //
  // };
  public lineChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
  public lineChartColors: Color[] = [
    {
      borderColor: Colors.getColors().themeColor1,
      backgroundColor: Colors.getColors().themeColor2_10,
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  pieColors: Color[] = [
    {
      backgroundColor: [
        Colors.getColors().themeColor1,
        Colors.getColors().themeColor2,
        Colors.getColors().themeColor3
      ]
    }
  ];

  constructor(private modalService: BsModalService,
              private notifications: NotificationsService,
              private globeService: GlobalService,
              private route: ActivatedRoute,
              private router: Router,
              private spinner: NgxSpinnerService,
              private customDashboardService : CustomDashboardService,
              private lightbox: Lightbox
              ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();

  }

  ngOnInit(): void {

    this.getAllListingsInit();
    this.getFormCount();
  }
  getFormCount() {
    this.spinner.show();
    this.customDashboardService.getFormCount().subscribe( response => {
      this.allCounts = response["allCount"];
      this.underReview = response["underReview"];
      this.approved = response["approved"];
      this.rejected = response["rejected"];
      this.suspended = response["suspended"];
      this.categories = response["categories"];
      this.activityLogs = response["activityLog"];
      // this.listingsChart = response["listingsChart"];
      this.pieChartLabels = this.categories["labels"];
      this.pieChartData =this.categories["counts"];
      // this.lineChartLabels = this.listingsChart["days"]
      // this.lineChartData[0].data = this.listingsChart["counts"];
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

  routedTo(module, adminStatus) {
    this.router.navigate(['/app/listings/'+module], { queryParams: { adminStatus: adminStatus } });
  }

  refreshLog() {
    // this.spinner.show();
    // this.customDashboardService.getActivityLogs().subscribe( response => {
    //   this.activityLogs = response["activityLog"];
    //   this.spinner.hide();
    // }, err => {
    //   this.onError(err.message);
    //   this.spinner.hide();
    // });
    this.getFormCount();
  }

  getAllListingsInit() {
    let data = {
      query:this.searchValue
    }
    this.customDashboardService.getAllListings(this.pageNo, this.pageSize,this.adminStatus,data).subscribe( response => {
      this.listings = response["results"];
      this.listings_count = response["filter"];
    }, err => {
      this.onError(err.message);
    });
  }

  getAllListings() {
    this.spinner.show();
    let data = {
      query:this.searchValue
    }
    this.customDashboardService.getAllListings(this.pageNo, this.pageSize,this.adminStatus,data).subscribe( response => {
      this.listings = response["results"];
      this.listings_count = response["filter"];
      this.spinner.hide();
    }, err => {
      this.onError(err.message);
      this.spinner.hide();
    });
  }

  searchTable() {
   console.log(this.searchValue);
    this.getAllListings();
  }

  clear() {
    this.searchValue = "";
    this.getAllListings();
  }

  pageChanged(event: PageChangedEvent) {
    this.pageNo = event.page;
    this.getAllListings();
  }

  pageSizeChange(event) {
    this.pageSize = event;
    this.getAllListings();
  }

  clearModel(statusModel: any, statusForm: NgForm) {
    statusModel.hide();
    this.statusForm.resetForm();
  }

  statusSubmit(statusModel: ModalDirective,statusForm: NgForm,status) {
    this.buttonDisabled = false;


    if (!this.statusForm.valid || this.buttonDisabled) {
      this.isSubmitted = true;
      return;
    }
    statusForm.value.status=status;
    statusForm.value.listingId=this.selectedListing._id;

    this.buttonDisabled = true;
    this.responseWaiting = 'show-spinner';
    this.spinner.show();

    this.customDashboardService.changeStatus(statusForm.value).subscribe(response => {
      this.responseWaiting = '';
      statusModel.hide();
      this.getAllListings();
      this.getFormCount();
      this.spinner.hide();
      this.buttonDisabled = false;
      this.onSuccess('Status Updated');
    }, err => {
      this.spinner.hide();
      this.buttonDisabled = false;
      this.onError(err.message);
      this.globeService.unauthorizedRequest(err.status);
    });
  }

  openStatusModal(statusModel: ModalDirective, key: number) {
    this.isEdit = true;
    this.isSubmitted = false;
    this.responseWaiting = '';
    this.selectedListing = this.listings[key];
    statusModel.show();
  }


  openListingModel(listingModel: ModalDirective, listing: any) {
    this.spinner.show();
    this.imagesLightBox = [];
    this.customDashboardService.listingDetailsById(listing._id).subscribe( response => {
      this.selectedListing = response;
      if(this.selectedListing.imageUrls && this.selectedListing.imageUrls.length>0){

        for (let i = 0; i <this.selectedListing.imageUrls.length; i++) {
          const src = this.selectedListing.imageUrls[i];
          const caption = this.selectedListing.title;
          const thumb = this.selectedListing.imageUrls[i];
          const album = {
            src: src,
            caption: caption,
            thumb: thumb
          };
          this.imagesLightBox.push(album);
        }

      }
      listingModel.show();
      this.spinner.hide();
    }, err => {
      this.onError(err.message);
      this.spinner.hide();
    });
  }

  openLightbox(index: number): void {
    this.lightbox.open(this.imagesLightBox, index, {centerVertically: true, positionFromTop: 0, disableScrolling: true, wrapAround: true, showImageNumberLabel: true, alwaysShowNavOnTouchDevices:true});
  }

  close(): void {
    this.lightbox.close();
  }

}
