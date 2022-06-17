import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EaseHotelBookingComponent } from './ease-hotel-booking.component';

describe('EaseHotelBookingComponent', () => {
  let component: EaseHotelBookingComponent;
  let fixture: ComponentFixture<EaseHotelBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EaseHotelBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EaseHotelBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
