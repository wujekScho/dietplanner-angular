import { PlannedDay } from './../../../common/interfaces';
import { PlannedDaysService } from '../../services/planned-days.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-planned-meals',
  templateUrl: './planned-meals.component.html',
  styleUrls: ['./planned-meals.component.css']
})
export class PlannedMealsComponent implements OnInit {
  userId = 1;
  plannedDays: PlannedDay[] = [];
  procededDates: Date[] = [];
  day;

  constructor(private service: PlannedDaysService, private router: Router, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.refreshData();
    for (let i = 0; i <= 12; i++) {
      this.procededDates.push(moment().add(i, 'days').toDate());
    }
  }

  public refreshData() {
    this.plannedDays = [];
    this.service.getAllByUserId(this.userId).subscribe((plannedDays: PlannedDay[]) => this.plannedDays = plannedDays);
  }

  showDetails(day: PlannedDay) {
    this.router.navigate(["/planned-meals/" + day.id]);
  }

  getDateOfPlannedDay(day: PlannedDay) {
    let dayArr = day.mealsDate;
    return new Date(dayArr[0], dayArr[1] - 1, dayArr[2]);
  }

  getDateOfNow() {
    let today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }

  compareDates(a: Date, b: Date) {
    return (a.getDate() == b.getDate()) && (a.getMonth() == b.getMonth()) && (a.getFullYear() == b.getFullYear());
  }

  getPlannedDayObjectOfDate(date: Date) {
    for (let day of this.plannedDays) {
      if (this.compareDates(this.getDateOfPlannedDay(day), date)) {
        return day;
      }
    }
    return null;
  }

  delete(day: PlannedDay) {
    this.service.delete(day.id).subscribe(() => {
      this.refreshData();
    });
  }

  edit(day: PlannedDay) {
    this.delete(day);
    this.router.navigate(["/add-day-meals/" + this.userId + "/" + this.datePipe.transform(day.mealsDate, 'yyyy.MM.dd')]);
  }
}

