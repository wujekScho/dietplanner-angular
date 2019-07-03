import { PlannedMealsComponent } from './../planned-meals/planned-meals.component';
import { DayMeals } from './../../../common/interfaces';
import { DayMealsService } from './../../services/day-meals.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlannedDaysService } from 'src/app/services/planned-days.service';

@Component({
  selector: 'app-add-day-meals',
  templateUrl: './add-day-meals.component.html',
  styleUrls: ['./add-day-meals.component.css']
})
export class AddDayMealsComponent implements OnInit {
  userId: number;
  mealDate: number[];
  allDayMeals: DayMeals[];


  constructor(private route: ActivatedRoute, private plannedDaysService: PlannedDaysService, private dayMealsService: DayMealsService,
    private router: Router, private plannedMealsComp: PlannedMealsComponent) {

  }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        this.userId = +params.get('userId');
        this.mealDate = this.getMealDateArr(params.get('mealDate'));
      });

    this.dayMealsService.getAllByUserId(+sessionStorage.getItem('loggedUserId')).subscribe((dayMeals: DayMeals[]) => this.allDayMeals = dayMeals);
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
      dayMealsId: dayMealsId,
      userId: this.userId
    }
    this.plannedDaysService.create(newPlannedDay).subscribe();
    this.router.navigate(["/planned-meals"]);
  }
}
