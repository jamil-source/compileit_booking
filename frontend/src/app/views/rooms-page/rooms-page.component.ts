import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../services/http/bookings.service';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrl: './rooms-page.component.css',
})
export class RoomsPageComponent implements OnInit {
  constructor(private bookingsService: BookingsService) {}

  ngOnInit(): void {
    this.getBookingsList();
  }

  getBookingsList() {
    this.bookingsService.getBookings().subscribe({
      next: (result) => {
        console.log(result);
      },
    });
  }
}
