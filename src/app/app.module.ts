import { PlannedDaysService } from './services/planned-days.service';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DataService } from './services/data.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlannedMealsComponent } from './components/planned-meals/planned-meals.component';
import { DayMealsService } from './services/day-meals.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    PlannedMealsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component:  HomeComponent},
      { path: 'planned-meals', component: PlannedMealsComponent },
      { path: '**', component: NotFoundComponent },
    ])
  ],
  providers: [
    DataService,
    DayMealsService,
    PlannedDaysService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
