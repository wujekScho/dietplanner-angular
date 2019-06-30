import { AbstractControl } from '@angular/forms';
import { resolve } from 'url';

export class PasswordValidators {
    static passwordsShouldMatch(control: AbstractControl) {
        let password = control.get('password');
        let repeatedPassword = control.get('repeatedPassword');
        if (password !== repeatedPassword) {
            return { passwordsShouldMatch: true };
        }
        return null;
    }
}