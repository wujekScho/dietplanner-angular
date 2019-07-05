import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GlobalProviderComponent } from './../components/global-provider/global-provider.component';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MealService extends DataService {

  constructor(private hostProvider: GlobalProviderComponent, private htttp: HttpClient) {
    super(hostProvider.host + '/meals', htttp);
  }

  getAllByUserId(id: number) {
    return this.http.get(this.url + "/user/" + id, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }
}
