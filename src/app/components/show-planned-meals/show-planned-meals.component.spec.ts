import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPlannedMealsComponent } from './show-planned-meals.component';

describe('ShowPlannedMealsComponent', () => {
  let component: ShowPlannedMealsComponent;
  let fixture: ComponentFixture<ShowPlannedMealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPlannedMealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPlannedMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
