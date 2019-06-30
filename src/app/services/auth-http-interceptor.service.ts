import { LoginService } from 'src/app/services/login.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthHttpInterceptorService implements HttpInterceptor {
  constructor(private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // if (sessionStorage.getItem('loggedUsername') && sessionStorage.getItem('basicauth')) {
    if (this.loginService.isUserLoggedIn()) {
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('basicauth')
        }
      })
    }
    return next.handle(req);
  }
}
