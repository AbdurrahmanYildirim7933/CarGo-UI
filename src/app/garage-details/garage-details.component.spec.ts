import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageDetailsComponent } from './garage-details.component';

describe('GarageDetailsComponent', () => {
  let component: GarageDetailsComponent;
  let fixture: ComponentFixture<GarageDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GarageDetailsComponent]
    });
    fixture = TestBed.createComponent(GarageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
