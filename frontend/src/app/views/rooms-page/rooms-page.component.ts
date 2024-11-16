import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../services/http/bookings.service';
import { RoomsService } from '../../services/http/rooms.service';
import { IBooking } from '../../interfaces/Bookings/IBooking.interface';
import { IRoom } from '../../interfaces/Rooms/IRoom.interface';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.css'],
})
export class RoomsPageComponent implements OnInit {
  public bookings: IBooking[] = [];
  public rooms: IRoom[] = [];
  public shownDates: string[] = [];
  public activeDateIndex: number = 0;
  public faArrowRight = faArrowRight;
  public faArrowLeft = faArrowLeft;
  public uniqueDatesCount: number = 0;

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
        const today = new Date().toISOString().split('T')[0]; 
        this.bookings = result.filter(booking => booking.date >= today);
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
        this.setupVisibleDates();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  setupVisibleDates() {
    const dates = Array.from(new Set(this.bookings.map((b) => b.date)));
    this.uniqueDatesCount = dates.length;
    this.shownDates = dates.slice(
      this.activeDateIndex,
      this.activeDateIndex + 3
    );
  }

  prevDate() {
    if (this.activeDateIndex > 0) {
      this.activeDateIndex -= 3;
      this.setupVisibleDates();
    }
  }

  nextDate() {
    if (this.activeDateIndex + 3 < this.uniqueDatesCount) {
      this.activeDateIndex += 3;
      this.setupVisibleDates();
    }
  }

  getBookingsForRoomAndDate(roomId: number, date: string) {
    return this.bookings.filter(
      (booking) => booking.roomId === roomId && booking.date === date
    );
  }
}
