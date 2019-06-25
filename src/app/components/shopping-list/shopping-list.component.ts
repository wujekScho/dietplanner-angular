import { SelectedDay } from './../../../common/interfaces';
import { Component, OnInit } from '@angular/core';
import { PlannedDay } from 'src/common/interfaces';
import { PlannedDaysService } from 'src/app/services/planned-days.service';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  daysSelected: boolean;
  userId = 1;
  _selectedDays: SelectedDay[] = [];


  constructor(private service: PlannedDaysService) {
    this.daysSelected = false;
  }

  ngOnInit() {
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

  getShoppingList() {
    this.daysSelected = true;
    let selectedIds = this.selectedDays
      .filter(day => day.checked)
      .map(day => day.plannedDay.id);
    console.log(selectedIds);
  }
}
