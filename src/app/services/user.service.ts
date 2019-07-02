import { catchError, tap } from 'rxjs/operators';
import { GlobalProviderComponent } from './../components/global-provider/global-provider.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService {

  constructor(protected http: HttpClient, private hostProvider: GlobalProviderComponent) {
    super(hostProvider.host + '/user', http);
  }

  checkUsernameAvailability(username: string) {
    return this.http.get(this.url + '/check/' + username, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  registerUser(resource) {
    return this.http.post(this.url + '/register', JSON.stringify(resource), { headers: this.headers, withCredentials: true }).pipe(
      catchError(this.handleError),
    );
  }

  addMeasurement(resource) {
    return this.http.post(this.url + '/add-weight', JSON.stringify(resource), { headers: this.headers, withCredentials: true }).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  editMeasurement(resource) {
    return this.http.post(this.url + '/edit-weight', JSON.stringify(resource), { headers: this.headers, withCredentials: true }).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  deleteMeasurement(resource) {
    return this.http.post(this.url + '/delete-weight', JSON.stringify(resource), { headers: this.headers, withCredentials: true }).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }
}
