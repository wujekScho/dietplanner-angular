import { UserProgressComponent } from './components/user-progress/user-progress.component';
import { UsernameValidator } from './../common/validators/username.validator';
import { UserService } from './services/user.service';
import { MyErrorHandler } from './../common/errors/app-error-handler';
import { AuthHttpInterceptorService } from './services/auth-http-interceptor.service';
import { NgbdModalConfig } from './components/ng-bootstrap-components/modal/modal-config';
import { AddDayMealsComponent } from './components/add-day-meals/add-day-meals.component';
import { PlannedDaysService } from './services/planned-days.service';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlannedMealsComponent } from './components/planned-meals/planned-meals.component';
import { DayMealsService } from './services/day-meals.service';
import { DatePipe } from '@angular/common';
import { PlannedMealsDetailsComponent } from './components/planned-meals-details/planned-meals-details.component';
import { GlobalProviderComponent } from './components/global-provider/global-provider.component';
import { ShowPlannedMealsComponent } from './components/show-planned-meals/show-planned-meals.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    PlannedMealsComponent,
    AddDayMealsComponent,
    PlannedMealsDetailsComponent,
    GlobalProviderComponent,
    ShowPlannedMealsComponent,
    NgbdModalConfig,
    ShoppingListComponent,
    LoginComponent,
    RegisterComponent,
    UserProgressComponent,
    
  ],
  entryComponents: [
    NgbdModalConfig,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'planned-meals', component: PlannedMealsComponent, canActivate: [LoginService] },
      { path: 'planned-meals/:plannedDayId', component: PlannedMealsDetailsComponent, canActivate: [LoginService] },
      { path: 'show-planned-meals', component: ShowPlannedMealsComponent, canActivate: [LoginService] },
      { path: 'shopping-list', component: ShoppingListComponent, canActivate: [LoginService] },
      { path: 'progress', component: UserProgressComponent, canActivate: [LoginService] },
      { path: 'add-day-meals/:userId/:mealDate', component: AddDayMealsComponent, canActivate: [LoginService] },
      { path: '**', component: NotFoundComponent },
    ])
  ],
  providers: [
    DayMealsService,
    PlannedDaysService,
    LoginService,
    UserService,
    UsernameValidator,
    DatePipe,
    PlannedMealsComponent,
    GlobalProviderComponent,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptorService, multi: true },
    { provide: ErrorHandler, useClass: MyErrorHandler },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
