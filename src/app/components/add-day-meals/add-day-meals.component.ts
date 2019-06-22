import { PlannedDay, DayMeals } from './../../../common/interfaces';
import { DayMealsService } from './../../services/day-meals.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlannedDaysService } from 'src/app/services/planned-days.service';

@Component({
  selector: 'app-add-day-meals',
  templateUrl: './add-day-meals.component.html',
  styleUrls: ['./add-day-meals.component.css']
})
export class AddDayMealsComponent implements OnInit {
  userId: number;
  mealDate: number[];


  constructor(private route: ActivatedRoute, private plannedDaysService: PlannedDaysService, private dayMealsService: DayMealsService) {

  }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        this.userId = +params.get('userId');
        this.mealDate = this.getMealDateArr(params.get('mealDate'));
      })
  }

  getMealDateArr(date: string) {
    let mealDateArr = [];
    date.split('.').forEach(element => {
      mealDateArr.push(+element);
    });
    return mealDateArr;
  }

  addDayMealToDay(dayMealsId: number) {
    let newPlannedDay = {
      mealsDate: this.mealDate,
      dayMealsId: 1,
      userId: this.userId
    }
    console.log(newPlannedDay);
    this.plannedDaysService.create(newPlannedDay).subscribe();
  }
}
