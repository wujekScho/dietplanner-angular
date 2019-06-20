import { TestBed } from '@angular/core/testing';

import { PlannedDaysService } from './planned-days.service';

describe('PlannedDaysService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlannedDaysService = TestBed.get(PlannedDaysService);
    expect(service).toBeTruthy();
  });
});
