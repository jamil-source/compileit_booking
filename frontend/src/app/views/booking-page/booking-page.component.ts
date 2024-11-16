import { Component } from '@angular/core';
import { IBooking } from '../../interfaces/Bookings/IBooking.interface';
import { DataSharingService } from '../../services/shared/data-sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.css',
})
export class BookingPageComponent {
  public booking: IBooking;

  constructor(
    private dataSharingService: DataSharingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getBooking();
  }

  getBooking() {
    this.booking = this.dataSharingService.getBooking();

    if (!this.booking) {
      this.router.navigate(['/rum']);
    }
  }
}
