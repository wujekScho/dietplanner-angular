import { catchError } from 'rxjs/operators';
import { GlobalProviderComponent } from './../components/global-provider/global-provider.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class DayMealsService extends DataService {

  constructor(http: HttpClient, hostProvider: GlobalProviderComponent) {
    super(hostProvider.host+'/day_meals', http);
  }

  getAllByUserId(id: number) {
    return this.http.get(this.url + "/user/" + id, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }
}
