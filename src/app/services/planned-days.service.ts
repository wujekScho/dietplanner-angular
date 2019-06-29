import { GlobalProviderComponent } from './../components/global-provider/global-provider.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlannedDaysService extends DataService {

  constructor(protected http: HttpClient, hostProvider: GlobalProviderComponent) {
    super(hostProvider.host + '/planned_days', http);
  }

  getAllByUserId(id) {
    return this.http.get(this.url + '/user/' + id, {  withCredentials: true } ).pipe(
      catchError(this.handleError)
    );
  }

  getShoppingList(plannedDaysIds: number[]) {
    return this.http.post(this.url + '/shopping-list', JSON.stringify(plannedDaysIds), { headers: this.headers, withCredentials: true }).pipe(
      catchError(this.handleError),
    );
  }
}
