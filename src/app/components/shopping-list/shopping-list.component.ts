import { SelectedDay, ShoppingListProduct } from './../../../common/interfaces';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PlannedDay } from 'src/common/interfaces';
import { PlannedDaysService } from 'src/app/services/planned-days.service';
import * as jsPDF from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  daysSelected: boolean;
  userId: number;
  _selectedDays: SelectedDay[] = [];
  allUnchecked: boolean;
  _shoppingListProducts: ShoppingListProduct[] = [];
  @ViewChild("content", { static: false }) content: ElementRef;

  constructor(private service: PlannedDaysService) {
    this.daysSelected = false;
  }

  ngOnInit() {
    this.userId = +sessionStorage.getItem('loggedUserId');
    this.refreshData();
  }

  public refreshData() {
    this.service.getAllByUserId(this.userId).subscribe((plannedDays: PlannedDay[]) => {
      for (let plannedDay of plannedDays) {
        this._selectedDays.push({
          plannedDay: plannedDay,
          checked: true
        });
      }
    });
  }

  get selectedDays() {
    return this._selectedDays;
  }

  get shoppingListProducts() {
    return this._shoppingListProducts;
  }

  checkCheckboxes() {
    this.allUnchecked = true;
    this._selectedDays.forEach(selectedDay => {
      if (selectedDay.checked) {
        this.allUnchecked = false;
        return;
      }
    });
  }

  getShoppingList() {
    this.daysSelected = true;
    let selectedIds = this.selectedDays
      .filter(day => day.checked)
      .map(day => day.plannedDay.id);
      this.service.getShoppingList(selectedIds).subscribe((shoppingListProducts: ShoppingListProduct[])=>{
        this._shoppingListProducts=shoppingListProducts;
      })
  }

  removeItem(product: ShoppingListProduct) {
    let index = this._shoppingListProducts.indexOf(product);
    this._shoppingListProducts.splice(index,1);
  }

  downloadPDF() {
    let content = this.content.nativeElement;
    html2canvas(content).then(canvas => {
      var imgWidth = 190;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 9;
      pdf.addImage(contentDataURL, 'PDF', position, position, imgWidth, imgHeight);
      pdf.save('lista_zakupów.pdf');
    });
  }
}
