import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDayMealsComponent } from './add-day-meals.component';

describe('AddDayMealsComponent', () => {
  let component: AddDayMealsComponent;
  let fixture: ComponentFixture<AddDayMealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDayMealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDayMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
