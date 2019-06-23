import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalProviderComponent } from './global-provider.component';

describe('GlobalProviderComponent', () => {
  let component: GlobalProviderComponent;
  let fixture: ComponentFixture<GlobalProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
