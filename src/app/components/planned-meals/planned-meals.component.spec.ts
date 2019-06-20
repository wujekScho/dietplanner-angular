import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedMealsComponent } from './planned-meals.component';

describe('PlannedMealsComponent', () => {
  let component: PlannedMealsComponent;
  let fixture: ComponentFixture<PlannedMealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannedMealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannedMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
