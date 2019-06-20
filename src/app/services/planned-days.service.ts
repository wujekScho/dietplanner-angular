import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlannedDaysService extends DataService {

  constructor(protected http: HttpClient) {
    super('http://localhost:8080/planned_days', http);
  }

  getAllByUserId(id) {
    return this.http.get(this.url+'/user/'+id).pipe(
      catchError(super.handleError)
    );
  }
}
