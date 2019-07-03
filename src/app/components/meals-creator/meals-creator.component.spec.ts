import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealsCreatorComponent } from './meals-creator.component';

describe('MealsCreatorComponent', () => {
  let component: MealsCreatorComponent;
  let fixture: ComponentFixture<MealsCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealsCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealsCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
