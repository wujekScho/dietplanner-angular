import { AppError } from './../../common/errors/app-error';
import { BadInputError } from './../../common/errors/bad-request-error';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotFoundError } from 'src/common/errors/not-found-error';

@Injectable()
export class DataService {

  constructor(protected url: string, protected http: HttpClient) { }

  getAll() {
    return this.http.get(this.url).pipe(
      catchError(this.handleError)
    );
  }

  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource)).pipe(
      catchError(this.handleError)
    );
  }

  update(resource) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify(resource)).pipe(
      catchError(this.handleError)
    );
  }

  delete(id) {
    return this.http.delete(this.url + "/" + id).pipe(
      catchError(this.handleError)
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
