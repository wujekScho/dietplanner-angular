import { DayMealsService } from './../../services/day-meals.service';
import { MealService } from './../../services/meal.service';
import { Meal } from './../../../common/interfaces';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meals-creator',
  templateUrl: './meals-creator.component.html',
  styleUrls: ['./meals-creator.component.css']
})
export class MealsCreatorComponent implements OnInit {
  _meals: Meal[] = [];
  pickingDay;
  pickingMeal = false;
  dayMeals = [{ title: 'Śniadanie', meal: null },
  { title: 'Drugie śniadanie', meal: null },
  { title: 'Obiad', meal: null },
  { title: 'Podwieczorek', meal: null },
  { title: 'Kolacja', meal: null }];


  constructor(private mealService: MealService, private dayMealsService: DayMealsService) { }

  ngOnInit() {
    this.mealService.getAllByUserId(+sessionStorage.getItem('loggedUserId')).subscribe((response: Meal[]) => {
      this._meals = response;
    });
  }

  pickMeal(dayMeal) {
    this.pickingMeal = true;
    this.pickingDay = dayMeal;
  }

  endOfPicking() {
    this.pickingMeal = false;
    this.pickingDay = null;
  }

  cancelPicking() {
    this.pickingDay.meal = null;
    this.pickingMeal = false;
    this.pickingDay = null;
  }

  deleteMeal(dayMeal) {
    dayMeal.meal = null;
  }

  saveMeals() {
    let userDayMeals = {
      userId: +sessionStorage.getItem('loggedUserId'),
      breakfastId: this.dayMeals[0].meal.id,
      brunchId: this.dayMeals[1].meal.id,
      dinnerId: this.dayMeals[2].meal.id,
      teaId: this.dayMeals[3].meal.id,
      supperId: this.dayMeals[4].meal.id
    };
    this.dayMealsService.createUserDayMeals(userDayMeals).subscribe(() => {
      alert('Posiki dodane pomyślnie');
      this.dayMeals = [{ title: 'Śniadanie', meal: null },
      { title: 'Drugie śniadanie', meal: null },
      { title: 'Obiad', meal: null },
      { title: 'Podwieczorek', meal: null },
      { title: 'Kolacja', meal: null }];
    });
  }

  get meals() {
    return this._meals;
  }

  get macros() {
    let macros = [0, 0, 0, 0]
    this.dayMeals.forEach(meal => {
      if (meal.meal !== null) {
        macros[0] += meal.meal.calories;
        macros[1] += meal.meal.carbohydrates;
        macros[2] += meal.meal.fat;
        macros[3] += meal.meal.protein;
      }
    })
    return macros;
  }

  get allPicked() {
    let allPicked = true;
    this.dayMeals.forEach(meal => {
      if (meal.meal === null) {
        allPicked = false;
      }
    })
    return allPicked;
  }
}
