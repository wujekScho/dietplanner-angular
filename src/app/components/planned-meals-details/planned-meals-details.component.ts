import { ActivatedRoute } from '@angular/router';
import { PlannedDaysService } from './../../services/planned-days.service';
import { PlannedDay, Meal, MealProduct } from './../../../common/interfaces';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-planned-meals-details',
  templateUrl: './planned-meals-details.component.html',
  styleUrls: ['./planned-meals-details.component.css']
})
export class PlannedMealsDetailsComponent implements OnInit {
  plannedDay: PlannedDay;
  plannedDayId: number;
  @ViewChild("content", { static: false }) content: ElementRef;

  constructor(private service: PlannedDaysService, private route: ActivatedRoute, private datePipe: DatePipe) { }

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
    return (this.plannedDay) && this.plannedDay.dayMeals;
  }

  

  downloadPDF() {
    let content = this.content.nativeElement;
    html2canvas(content).then(canvas => {
      console.log(content);
      var imgWidth = 190;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 9;
      pdf.addImage(contentDataURL, 'PDF', position, position, imgWidth, imgHeight);
      pdf.save('dietplanner_' + this.datePipe.transform(this.mealsDate, 'yyyy.MM.dd') + '.pdf');
    });
  }
}
