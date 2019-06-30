import { GlobalProviderComponent } from './../components/global-provider/global-provider.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService {

  constructor(protected http: HttpClient, hostProvider: GlobalProviderComponent) {
    super(hostProvider.host + '/user', http);
  }
}
