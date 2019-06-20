import { PlannedDay } from './../../../common/interfaces';
import { PlannedDaysService } from '../../services/planned-days.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planned-meals',
  templateUrl: './planned-meals.component.html',
  styleUrls: ['./planned-meals.component.css']
})
export class PlannedMealsComponent implements OnInit {
  plannedDays: PlannedDay[];

  constructor(private service: PlannedDaysService) { }

  ngOnInit() {
    this.service.getAllByUserId(1).subscribe((plannedDays: PlannedDay[]) => this.plannedDays = plannedDays);
  }

  onClick() {
    console.log(this.plannedDays);
  }
}

