import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
// @Injectable makes to available services in root level.

@Injectable({providedIn:'root'})
export class AppCommonService {
  submitFormData = new Subject();
}