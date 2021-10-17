import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {GlobalService} from '../../../shared/global.service';

@Injectable({
  providedIn: 'root'
})
export class CustomDashboardService {

  constructor(private http:HttpClient,private globalService:GlobalService) { }

  getFormCount() {
    return this.http.get(this.globalService.getAPIUrl() + '/dashboard/DashboardCounts', this.globalService.getHttpOptions());
  }
  getActivityLogs() {
    return this.http.get(this.globalService.getAPIUrl() + '/dashboard/activityLogs', this.globalService.getHttpOptions());
  }

  getAllListings(pageNo: number, pageSize: string, adminStatus: string, data: { query: string }) {
    return this.http.post(this.globalService.getAPIUrl() + '/dashboard/allListings?pageNo='+ pageNo + '&pageSize='+ pageSize + '&adminStatus='+adminStatus,data, this.globalService.getHttpOptions());
  }

  changeStatus(data: any) {
    return this.http.post(this.globalService.getAPIUrl() + '/dashboard/updateListingStatus',data, this.globalService.getHttpOptions());
  }

  listingDetailsById(_id: any) {
    return this.http.get(this.globalService.getAPIUrl() + '/dashboard/listingFullDetailsById?id='+ _id, this.globalService.getHttpOptions());

  }
}
