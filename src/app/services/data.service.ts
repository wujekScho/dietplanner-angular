import { AppError } from './../../common/errors/app-error';
import { BadInputError } from './../../common/errors/bad-request-error';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { NotFoundError } from 'src/common/errors/not-found-error';

@Injectable()
export class DataService {

  headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  constructor(protected url: string, protected http: HttpClient) { }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getAll() {
    return this.http.get(this.url).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number) {
    return this.http.get(this.url + "/" + id).pipe(
      catchError(this.handleError)
    );
  }

  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource), { headers: this.headers }).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  update(resource) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify(resource)).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  delete(id) {
    return this.http.delete(this.url + "/" + id).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  handleError(error: Response) {
    if (error.status === 404) {
      return throwError(new NotFoundError)
    }
    if (error.status === 400) {
      return throwError(new BadInputError((error.json())))
    }
    return throwError(new AppError(error));
  }
}
