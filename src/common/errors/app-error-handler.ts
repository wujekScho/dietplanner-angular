import { NotFoundError } from './not-found-error';
import { BadInputError } from './bad-request-error';
import { WrongCredentialsError } from './wrong-credentials-error';
import { ErrorHandler } from '@angular/core';
import { NotUniqueDateMeasurement } from './not-unique-date-measurement';

export class MyErrorHandler implements ErrorHandler {
    handleError(error) {
        if (error instanceof WrongCredentialsError) {
            alert('Zły login lub hasło');
        } else if (error instanceof BadInputError) {
            alert('Podano złe dane');
        } else if (error instanceof NotFoundError) {
            alert('Podano nieprawidłowy adres');
        } else if (error instanceof NotUniqueDateMeasurement) {
            alert('Dodano już wagę dla dzisiejszego dnia, aby ją zmodyfikować wejdź w zakładkę edytuj.');
        }else {
            alert('Wystąpił niespodziewany błąd');
        }
        console.log(error);
    }
}

