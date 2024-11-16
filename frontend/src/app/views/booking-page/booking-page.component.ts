import { Component } from '@angular/core';
import { IBooking } from '../../interfaces/Bookings/IBooking.interface';
import { DataSharingService } from '../../services/shared/data-sharing.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { specialCharactersValidator } from '../../shared/validators/special-characters.validator';
import { fullNameValidator } from '../../shared/validators/fullname.validator';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.css',
})
export class BookingPageComponent {
  public booking: IBooking;
  public bookingForm: FormGroup;

  constructor(
    private dataSharingService: DataSharingService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getBooking();
    this.initiliazeBookingForm();
  }

  getBooking() {
    this.booking = this.dataSharingService.getBooking();

    /* if (!this.booking) {
      this.router.navigate(['/rum']);
    } */
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
}
