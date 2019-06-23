import { AddDayMealsComponent } from './components/add-day-meals/add-day-meals.component';
import { PlannedDaysService } from './services/planned-days.service';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlannedMealsComponent } from './components/planned-meals/planned-meals.component';
import { DayMealsService } from './services/day-meals.service';
import { DatePipe } from '@angular/common';
import { PlannedMealsDetailsComponent } from './components/planned-meals-details/planned-meals-details.component';
import { GlobalProviderComponent } from './components/global-provider/global-provider.component';
import { ShowPlannedMealsComponent } from './components/show-planned-meals/show-planned-meals.component';

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
    ShowPlannedMealsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'planned-meals', component: PlannedMealsComponent },
      { path: 'planned-meals/:plannedDayId', component: PlannedMealsDetailsComponent },
      { path: 'show-planned-meals', component: ShowPlannedMealsComponent },
      { path: 'add-day-meals/:userId/:mealDate', component: AddDayMealsComponent },
      { path: '**', component: NotFoundComponent },
    ])
  ],
  providers: [
    DayMealsService,
    PlannedDaysService,
    DatePipe,
    PlannedMealsComponent,
    GlobalProviderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
