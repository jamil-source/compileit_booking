import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../services/http/bookings.service';
import { RoomsService } from '../../services/http/rooms.service';
import { IBooking } from '../../interfaces/Bookings/IBooking.interface';
import { IRoom } from '../../interfaces/Rooms/IRoom.interface';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrl: './rooms-page.component.css',
})
export class RoomsPageComponent implements OnInit {
  public bookings: IBooking[];
  public rooms: IRoom[];

  constructor(
    private bookingsService: BookingsService,
    private roomsService: RoomsService
  ) {}

  ngOnInit(): void {
    this.getBookingsList();
  }

  getBookingsList() {
    this.bookingsService.getBookings().subscribe({
      next: (result) => {
        this.bookings = result;
        this.getRoomsList();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getRoomsList() {
    this.roomsService.getRooms().subscribe({
      next: (result) => {
        this.rooms = result;
        console.log(result);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
