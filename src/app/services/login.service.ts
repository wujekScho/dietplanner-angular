import { WrongCredentialsError } from '../../common/errors/wrong-credentials-error';
import { AppError } from './../../common/errors/app-error';
import { catchError } from 'rxjs/operators';
import { User } from './../../common/interfaces';
import { GlobalProviderComponent } from './../components/global-provider/global-provider.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable()
export class LoginService implements CanActivate {
  constructor(private http: HttpClient, private urlProvider: GlobalProviderComponent, private router: Router) { }

  canActivate() {
    if (this.isUserLoggedIn()) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }

  authenticate(credentials, callback) {
    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});
    this.http.get(this.urlProvider.host + '/user', { headers: headers })
      .pipe(
        catchError(this.handleError)
      )
      .subscribe((response?: User) => {
        if (response) {
          sessionStorage.setItem('loggedUsername', response.username);
          let authString = 'Basic ' + btoa(credentials.username + ':' + credentials.password);
          sessionStorage.setItem('basicauth', authString);
          sessionStorage.setItem('loggedUserId', ''+response.id);
        }
        return callback && callback();
      });
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('loggedUsername');
    let basicAuth = sessionStorage.getItem('basicauth');
    return user !== null && basicAuth !== null;
  }

  logout() {
    sessionStorage.removeItem('loggedUsername');
    sessionStorage.removeItem('basicauth');
    sessionStorage.removeItem('loggedUserId');
  }

  handleError(error: Response) {
    if (error.status === 401) {
      return throwError(new WrongCredentialsError(error));
    }
    return throwError(new AppError(error));
  }
}
