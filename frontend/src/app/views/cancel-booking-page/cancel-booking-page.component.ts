import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../services/shared/data-sharing.service';
import { IBooking } from '../../interfaces/Bookings/IBooking.interface';
import { Router } from '@angular/router';
import { BookingsService } from '../../services/http/bookings.service';
import { ModalService } from '../../services/shared/modal.service';
import { faSmile } from '@fortawesome/free-regular-svg-icons';
import { IRoom } from '../../interfaces/Rooms/IRoom.interface';

@Component({
  selector: 'app-cancel-booking-page',
  templateUrl: './cancel-booking-page.component.html',
  styleUrl: './cancel-booking-page.component.css',
})
export class CancelBookingPageComponent implements OnInit {
  public booking: IBooking;
  public rooms: IRoom[];
  public faSmile = faSmile;

  constructor(
    private dataSharingService: DataSharingService,
    private router: Router,
    private bookingsService: BookingsService,
    private modalService: ModalService
  ) {}
  ngOnInit() {
    this.getBooking();
    this.getRooms();
  }

  getBooking() {
    this.booking = this.dataSharingService.getBooking();

    if (!this.booking) {
      this.router.navigate(['/rum']);
    }
  }

  getRooms() {
    this.rooms = this.dataSharingService.getRooms();
  }

  cancelBooking() {
    this.bookingsService.putBooking(null, this.booking.id).subscribe({
      next: (result) => {
        this.modalService.messageOutput(result?.message);
        this.modalService.iconOutput(this.faSmile);
        this.router.navigate(['/rum']);
      },
      error: (error) => {
        this.modalService.messageOutput(error?.error?.message);
        this.modalService.isErrorOutput(true);
      },
    });
  }
}
