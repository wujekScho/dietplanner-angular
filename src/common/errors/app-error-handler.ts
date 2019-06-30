import { NotFoundError } from './not-found-error';
import { BadInputError } from './bad-request-error';
import { WrongCredentialsError } from './wrong-credentials-error';
import { ErrorHandler } from '@angular/core';

export class MyErrorHandler implements ErrorHandler {
    handleError(error) {
        if (error instanceof WrongCredentialsError) {
            alert('Zły login lub hasło');
        } else if (error instanceof BadInputError) {
            alert('Podano złe dane');
        } else if (error instanceof NotFoundError) {
            alert('Podano nieprawidłowy adres');
        } else {
            alert('Wystąpił niespodziewany błąd');
        }
        console.log(error);
    }
}

