import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedMealsDetailsComponent } from './planned-meals-details.component';

describe('PlannedMealsDetailsComponent', () => {
  let component: PlannedMealsDetailsComponent;
  let fixture: ComponentFixture<PlannedMealsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannedMealsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannedMealsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
