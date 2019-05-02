import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';

// @Injectable makes to available services in root level.
@Injectable({providedIn:'root'})
export class AppCommonService {

  baseUrl:string = "http://localhost:8080";

    constructor(private httpClient : HttpClient) {}
  submitFormData = new Subject();

  getFormData(){
    return this.httpClient.get('/assets/mock.json');
  }


}