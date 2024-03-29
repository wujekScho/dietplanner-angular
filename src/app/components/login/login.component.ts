import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  _credentials = {username: '', password: ''};

  constructor(private loginService: LoginService, private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.loginService.authenticate(this._credentials, () => {
        this.router.navigateByUrl('/');
    });
    return false;
  }

  get credentials() {
    return this._credentials;
  }

}
