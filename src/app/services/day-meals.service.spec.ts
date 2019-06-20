import { TestBed } from '@angular/core/testing';

import { DayMealsService } from './day-meals.service';

describe('DayMealsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DayMealsService = TestBed.get(DayMealsService);
    expect(service).toBeTruthy();
  });
});
