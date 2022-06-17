import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EaseHotelBookingComponent } from './ease-hotel-booking/ease-hotel-booking.component';

const routes: Routes = [
  { path: '', component: EaseHotelBookingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
