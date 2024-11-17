import { Component } from '@angular/core';
import { IBooking } from '../../interfaces/Bookings/IBooking.interface';
import { DataSharingService } from '../../services/shared/data-sharing.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { specialCharactersValidator } from '../../shared/validators/special-characters.validator';
import { fullNameValidator } from '../../shared/validators/fullname.validator';
import { BookingsService } from '../../services/http/bookings.service';
import { ModalService } from '../../services/shared/modal.service';
import { faSmile } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.css',
})
export class BookingPageComponent {
  public booking: IBooking;
  public bookingForm: FormGroup;
  public faSmile = faSmile;

  constructor(
    private dataSharingService: DataSharingService,
    private router: Router,
    private fb: FormBuilder,
    private bookingsService: BookingsService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.getBooking();
    this.initiliazeBookingForm();
  }

  getBooking() {
    this.booking = this.dataSharingService.getBooking();

    if (!this.booking) {
      this.router.navigate(['/rum']);
    }
  }

  initiliazeBookingForm() {
    this.bookingForm = this.fb.group({
      fullname: [
        '',
        [
          Validators.required,
          specialCharactersValidator(),
          fullNameValidator(),
        ],
      ],
    });
  }

  validateOnBlur() {
    this.bookingForm.controls['fullname'].markAsTouched();
    this.bookingForm.controls['fullname'].updateValueAndValidity();
  }

  bookRoom() {
    const newBookerNameValue = this.bookingForm.controls['fullname'].value;

    this.bookingsService
      .putBooking(newBookerNameValue, this.booking.id)
      .subscribe({
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
