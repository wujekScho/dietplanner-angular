import { UserService } from './../../app/services/user.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { resolve, reject } from 'q';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UsernameValidator {
    constructor(private userService: UserService) { }

    isUsernameAvaliable(username: string): Observable<boolean> {
        return this.userService.checkUsernameAvailability(username).pipe(
            map((response: boolean) => response)
        );
    }

    // shouldBeUnique(control: AbstractControl): Promise<ValidationErrors | null> {
    //     return new Promise((resolve, reject) => {
    //         this.userService.checkUsernameAvailability(control.value).subscribe((isAvaliable: Boolean) => {
    //             console.log(isAvaliable);
    //             if (isAvaliable) {
    //                 resolve(null);
    //             } else {
    //                 resolve({ shouldBeUnique: true });
    //             }
    //         })
    //     });
    // }

    // static shouldBeUnique(control: AbstractControl): Promise<ValidationErrors | null> {
    //     return new Promise((resolve, reject) => {
    //         this.userService.checkUsernameAvailability(control.value).subscribe((isAvaliable: Boolean) => {
    //             console.log(isAvaliable);
    //             if (isAvaliable) {
    //                 resolve(null);
    //             } else {
    //                 resolve({ shouldBeUnique: true });
    //             }
    //         })
    //     });
    // }

    // static shouldBeUnique(userService: UserService) {
    //     return (control: AbstractControl) => {
    //         userService.checkUsernameAvailability(control.value).subscribe(res => {
    //         return res ? null : { shouldBeUnique: true };
    //       });
    //     };
    //   }

}