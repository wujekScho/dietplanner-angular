import { AppError } from './../../common/errors/app-error';
import { BadInputError } from './../../common/errors/bad-request-error';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { NotFoundError } from 'src/common/errors/not-found-error';
import { NotUniqueDateMeasurement } from 'src/common/errors/not-unique-date-measurement';

@Injectable()
export class DataService {

  headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  constructor(protected url: string, protected http: HttpClient) { }

  public _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getAll() {
    return this.http.get(this.url, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number) {
    return this.http.get(this.url + "/" + id, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource), { headers: this.headers, withCredentials: true }).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  update(resource) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify(resource), { withCredentials: true }).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  delete(id) {
    return this.http.delete(this.url + "/" + id, { withCredentials: true }).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  handleError(error: Response | any) {
    if (error.status === 404) {
      return throwError(new NotFoundError(error));
    }
    if (error.status === 400) {
      return throwError(new BadInputError(error));
    }
    if (error.status === 409 && error.error.message === 'not_unique_date') {
      return throwError(new NotUniqueDateMeasurement(error));
    }
    return throwError(new AppError(error));
  }
}
