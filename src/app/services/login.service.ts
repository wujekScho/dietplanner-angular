import { User } from './../../common/interfaces';
import { GlobalProviderComponent } from './../components/global-provider/global-provider.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {
  _loggedUser: User = null;

  constructor(private http: HttpClient, private urlProvider: GlobalProviderComponent) { }

  authenticate(credentials, callback) {
    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});
    this.http.get(this.urlProvider.host + '/user', { headers: headers }).subscribe((response?: User) => {
      if (response) {
        sessionStorage.setItem('loggedUsername', response.username);
        let authString = 'Basic ' + btoa(credentials.username + ':' + credentials.password);
        sessionStorage.setItem('basicauth', authString);
        this._loggedUser = response;
      } else {
      }
      return callback && callback();
    });
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem('username');
  }
}
