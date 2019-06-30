import { UserService } from './../../services/user.service';
import { PasswordValidators } from './../../../common/validators/password.validator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form;

  constructor(fb: FormBuilder, private userService: UserService) {
    this.form = fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      repeatedPassword: ['', Validators.required]
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

  addUser() {
    let user = {
      username: this.login,
      password: this.password
    }
    this.userService.create(user).subscribe(); //TODO: tu skończone
  }
}
