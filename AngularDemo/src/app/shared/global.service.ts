import { Injectable, Inject } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {environment} from '../../environments/environment';
import {NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

    // Observable string sources
    private componentMethodCallSource = new Subject<any>();
  // Observable string streams
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  public lgModalOption: NgbModalOptions = {size: 'lg', centered: true, backdrop: 'static', keyboard: false};
  public smModalOption: NgbModalOptions = {size: 'sm', centered: true, backdrop: 'static', keyboard: false};
  public defaultModalOption: NgbModalOptions = {centered: true, backdrop: 'static', keyboard: false};

  apiURL: string;

  constructor(private http: HttpClient,
             private router:Router) {
    this.apiURL = environment.apiUrl;
  }

  getAPIUrl() {
    return this.apiURL;
  }



  getHttpOptions() {
    return  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      })
    };
  }

  //With Auth Token
  // getHttpOptions() {
  //   return  {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + localStorage.getItem('authToken')})
  //   };
  // }

  getHttpOptionsGoogleAPI() {
    return  {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':  'http://localhost:4200',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
      })
    };
  }
  getHttpOptionsAgentAPI() {
    return  {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':  'http://localhost:4200',
        'x-api-key' : 'key_799d168226cbd532526829f657b429fb',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
      })
    };
  }

  getHttpOptionsBlob() {
    return  {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      })
    };
  }

  uploadFile (data: File[], userRef) {
    let httpOption = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      })
    };
    return this.http.post(this.apiURL + 'upload/file/' + userRef, data, httpOption);
  }

  uploadFilePdfReview (data: File[], userRef, documentFolderRef, propertyRef) {
    let httpOption = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      })
    };
    return this.http.post(this.apiURL + 'upload/fileReview/' + userRef +'/'+ documentFolderRef +"/"+ propertyRef ,data, httpOption);
  }

  uploadPdfFileToImages (data: File[], userRef , propertyRef) {
    let httpOption = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      })
    };
    return this.http.post(this.apiURL + 'upload/filePdf/' + userRef + '/' + propertyRef, data, httpOption);
  }

  unauthorizedRequest(status){
    if(status == 401){
      localStorage.setItem('authToken', '');
      localStorage.clear();
      this.router.navigate(['/auth/login/']);
    }
  }


}
