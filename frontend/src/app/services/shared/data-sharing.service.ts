import { Injectable } from '@angular/core';
import { IBooking } from '../../interfaces/Bookings/IBooking.interface';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  private bookingData: IBooking;

  setBooking(booking: IBooking) {
    this.bookingData = booking;
  }

  getBooking() {
    return this.bookingData;
  }
}
