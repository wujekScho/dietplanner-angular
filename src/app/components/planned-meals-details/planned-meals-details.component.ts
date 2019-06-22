import { ActivatedRoute } from '@angular/router';
import { PlannedDaysService } from './../../services/planned-days.service';
import { PlannedDay, Meal, MealProduct } from './../../../common/interfaces';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planned-meals-details',
  templateUrl: './planned-meals-details.component.html',
  styleUrls: ['./planned-meals-details.component.css']
})
export class PlannedMealsDetailsComponent implements OnInit {
  plannedDay: PlannedDay;
  plannedDayId: number;

  constructor(private service: PlannedDaysService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        this.plannedDayId = +params.get('plannedDayId');
      });
    this.service.getById(this.plannedDayId).subscribe((plannedDay: PlannedDay) => {
      this.plannedDay = plannedDay;
    });
  }

  getHomeMeasure(mealProduct: MealProduct) {
    if (mealProduct.product.homeMeasureWeightRatio) {
      return mealProduct.weight / mealProduct.product.homeMeasureWeightRatio + " x " + mealProduct.product.homeMeasureType;
    }
    return null;
  }

  get breakfast() {
    return (this.plannedDay) && this.plannedDay.dayMeals.breakfast.mealProducts;
  }

  get meals() {
    let meals = [];
    if (this.plannedDay) {
      meals.push(this.plannedDay.dayMeals.breakfast);
      meals.push(this.plannedDay.dayMeals.brunch);
      meals.push(this.plannedDay.dayMeals.dinner);
      meals.push(this.plannedDay.dayMeals.tea);
      meals.push(this.plannedDay.dayMeals.supper);
    }
    return (this.plannedDay) && meals;
  }

  get mealsDate() {
    return (this.plannedDay) && this.plannedDay.mealsDate;
  }

  get dayMeals() {
    return (this.plannedDay)&&this.plannedDay.dayMeals;
  }
}
