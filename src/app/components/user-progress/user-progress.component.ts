import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from './../../../common/interfaces';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-user-progress',
  templateUrl: './user-progress.component.html',
  styleUrls: ['./user-progress.component.css']
})
export class UserProgressComponent implements OnInit {
  lineChart = [];
  form;
  isEdited;
  _entries = [];
  minWeigth;
  maxWeigth;


  constructor(private userService: UserService, fb: FormBuilder, private datePipe: DatePipe) {
    this.form = fb.group({
      todaysWeigth: new FormControl('', [Validators.required, Validators.min(0), Validators.max(300)]),
    });
  }

  ngOnInit() {
    this.isEdited = true;
    this.userService.refreshNeeded$.subscribe(() => this.refreshData());
    this.refreshData();
  }

  refreshData() {
    this.userService.getById(+sessionStorage.getItem('loggedUserId')).subscribe((user: User) => {
      let weigthOverTime = user.weightOverTime;
      let dates = [];
      let weigths = [];
      this._entries = [];
      let entries = Object.entries(weigthOverTime);
      for (const [date, weigth] of entries) {
        this._entries.push([date, weigth, false]);
        dates.push(date);
        weigths.push(weigth);
      }
      this.minWeigth = this.minAndMaxWeigth[0];
      this.maxWeigth = this.minAndMaxWeigth[1];
      this.lineChart = new Chart('lineChart', {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            data: weigths,
            label: "Waga użykownika: " + sessionStorage.getItem('loggedUsername'),
            borderColor: "#3e95cd",
            fill: false
          }]
        },
        options: {
          title: {
            display: true,
          }
        }
      });
    })

  }

  addMeasurement(date: Date, weigth: number) {
    let todaysDate = date;
    let measurement = {
      userId: +sessionStorage.getItem('loggedUserId'),
      measurementDate: todaysDate,
      weight: weigth
    }
    this.userService.addMeasurement(measurement).subscribe();
  }

  addTodayMeasurement() {
    this.addMeasurement(new Date(), this.todaysWeigth.value);
  }

  editMeasurements() {
    this.isEdited = !this.isEdited;
    this.refreshData();
  }

  edit(entry) {
    entry[2] = !entry[2];
  }

  delete(entry) {
    let measurement = {
      userId: +sessionStorage.getItem('loggedUserId'),
      measurementDate: entry[0],
      weight: entry[1]
    }
    this.userService.deleteMeasurement(measurement).subscribe();
  }

  saveChanges(entry) {
    entry[2]=false;
    let measurement = {
      userId: +sessionStorage.getItem('loggedUserId'),
      measurementDate: entry[0],
      weight: entry[1]
    }
    this.userService.editMeasurement(measurement).subscribe();
  }

  get todaysWeigth() {
    return this.form.get('todaysWeigth');
  }

  get entries() {
    return this._entries;
  }

  get minAndMaxWeigth() {
    let minWeigth = 200;
    let maxWeigth = 0;
    if (this._entries.length > 0) {
      for (const [date, weigth] of this._entries) {
        if (minWeigth > weigth) {
          minWeigth = weigth;
        }
        if (maxWeigth < weigth) {
          maxWeigth = weigth;
        }
      }
    }
    return [((minWeigth - 20) < 0) ? 0 : (minWeigth - 20), ((maxWeigth + 20) > 200) ? 200 : (maxWeigth + 20)];
  }
}
