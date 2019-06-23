import { MealProduct } from './../../../common/interfaces';
import { Component, OnInit, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { PlannedDay } from 'src/common/interfaces';
import { PlannedDaysService } from 'src/app/services/planned-days.service';
import { Router } from '@angular/router';
import * as jsPDF from "jspdf";
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-show-planned-meals',
  templateUrl: './show-planned-meals.component.html',
  styleUrls: ['./show-planned-meals.component.css']
})
export class ShowPlannedMealsComponent implements OnInit {
  isDownloading = false;
  userId = 1;
  _plannedDays: PlannedDay[] = [];
  // @ViewChild("content", { static: false }) content: ElementRef;
  @ViewChildren('content') elements;

  constructor(private service: PlannedDaysService, private router: Router) {
  }

  ngOnInit() {
    this.service.refreshNeeded$.subscribe(() => this.refreshData());
    this.refreshData();
  }

  public refreshData() {
    this.service.getAllByUserId(this.userId).subscribe((plannedDays: PlannedDay[]) => this._plannedDays = plannedDays);
  }

  get plannedDays() {
    return (this._plannedDays) && this._plannedDays;
  }

  date(plannedDay: PlannedDay) {
    return plannedDay.mealsDate;
  }

  mealsOfPlannedDay(plannedDay: PlannedDay) {
    let meals = [];
    if (plannedDay) {
      meals.push(plannedDay.dayMeals.breakfast);
      meals.push(plannedDay.dayMeals.brunch);
      meals.push(plannedDay.dayMeals.dinner);
      meals.push(plannedDay.dayMeals.tea);
      meals.push(plannedDay.dayMeals.supper);
    }
    return (plannedDay) && meals;
  }

  getHomeMeasure(mealProduct: MealProduct) {
    if (mealProduct.product.homeMeasureWeightRatio) {
      return mealProduct.weight / mealProduct.product.homeMeasureWeightRatio + " x " + mealProduct.product.homeMeasureType;
    }
    return null;
  }

  get refElements() {
    return this.elements;
  }

  async downloadPDF() {

    this.isDownloading = true;
    const pdf = new jsPDF('p', 'mm', 'a4');

    let element;
    let i = 0;

    for (element of this.refElements) {
      const content = element.nativeElement;
      console.log(content);
      if (i != 0) {
        pdf.addPage();
      }

      await html2canvas(content).then(canvas => {
        var imgWidth = 190;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        const contentDataURL = canvas.toDataURL('image/png');
        var position = 9;
        pdf.addImage(contentDataURL, 'PNG', position, position, imgWidth, imgHeight);
      });
      i++;
    }
    pdf.save('dietplanner.pdf');
    this.isDownloading = false;
  }
}
