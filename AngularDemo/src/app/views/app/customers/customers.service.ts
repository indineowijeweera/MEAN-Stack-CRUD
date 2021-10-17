import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {GlobalService} from '../../../shared/global.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http:HttpClient,private globalService:GlobalService) { }


  getAllCustomers(pageNo: number, pageSize: String) {
    return this.http.get(this.globalService.getAPIUrl() + '/customer?pageNo='+ pageNo + '&pageSize='+ pageSize, this.globalService.getHttpOptions());

  }

  saveCustomer(form: any) {
    return this.http.post(this.globalService.getAPIUrl() + '/customer/add',form, this.globalService.getHttpOptions());
  }

  editCustomer(form: any) {
    return this.http.put(this.globalService.getAPIUrl() + '/customer/update',form, this.globalService.getHttpOptions());
  }

  deleteCustomer(id: any) {
    return this.http.delete(this.globalService.getAPIUrl() + '/customer?id='+id, this.globalService.getHttpOptions());
  }

  getCustomerById(customerId: any) {
      return this.http.get(this.globalService.getAPIUrl() + '/customer/getCustomerDetailsById?id='+customerId, this.globalService.getHttpOptions());
  }
}
