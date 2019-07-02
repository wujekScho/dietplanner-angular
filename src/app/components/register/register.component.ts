import { UsernameValidator } from './../../../common/validators/username.validator';
import { UserService } from './../../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form;

  constructor(fb: FormBuilder, private userService: UserService, private usernameValidator: UsernameValidator, private router:Router) {
    this.form = fb.group({
      login: new FormControl('', [Validators.required], this.isUsernameAvaliable.bind(this)),
      password: new FormControl('', [Validators.required]),
      repeatedPassword: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

  checkPasswords() {
    if (this.password.valid && this.repeatedPassword.valid) {
      if (this.password.value !== this.repeatedPassword.value) {
        this.repeatedPassword.setErrors({ diferentPasswords: true });
      }
    }
  }

  get login() {
    return this.form.get('login');
  }
  get password() {
    return this.form.get('password');
  }
  get repeatedPassword() {
    return this.form.get('repeatedPassword');
  }

  isUsernameAvaliable(control: AbstractControl) {
    return this.usernameValidator.isUsernameAvaliable(control.value).pipe(
      map((response: boolean) => response ? null : { usernameTaken: true } )
    )
  }

  addUser() {
    let user = {
      username: this.login.value,
      password: this.password.value
    }
    this.userService.registerUser(user).subscribe();
    alert('Zarejsetrowano nowego użytkowanika! Zaloguj się');
    this.router.navigateByUrl("/login");
  }
}
