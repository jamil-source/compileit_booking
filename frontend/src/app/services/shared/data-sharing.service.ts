import { Injectable } from '@angular/core';
import { IBooking } from '../../interfaces/Bookings/IBooking.interface';
import { IRoom } from '../../interfaces/Rooms/IRoom.interface';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  private bookingData: IBooking;
  private roomsData: IRoom[];

  setBooking(booking: IBooking) {
    this.bookingData = booking;
  }

  getBooking() {
    return this.bookingData;
  }

  setRooms(rooms: IRoom[]) {
    this.roomsData = rooms;
  }

  getRooms() {
    return this.roomsData;
  }
}
