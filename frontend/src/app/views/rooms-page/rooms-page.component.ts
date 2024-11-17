import { Component, HostListener, OnInit } from '@angular/core';
import { BookingsService } from '../../services/http/bookings.service';
import { RoomsService } from '../../services/http/rooms.service';
import { IBooking } from '../../interfaces/Bookings/IBooking.interface';
import { IRoom } from '../../interfaces/Rooms/IRoom.interface';
import {
  faArrowRight,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { DataSharingService } from '../../services/shared/data-sharing.service';
import { ModalService } from '../../services/shared/modal.service';

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
  public faChevronDown = faChevronDown;
  public faChevronUp = faChevronUp;
  public filterList = [];
  public selectedBooking: IBooking;

  public bookingsCopy: IBooking[] = [];

  public uniqueDatesCount: number = 0;
  public isDropdownOpen: boolean = false;

  constructor(
    private bookingsService: BookingsService,
    private roomsService: RoomsService,
    private router: Router,
    private dataSharingService: DataSharingService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getBookingsList();
  }

  getBookingsList() {
    this.bookingsService.getBookings().subscribe({
      next: (result) => {
        this.sortAndFilterBookings(result);
        this.getRoomsList();
      },
      error: (error) => {
        this.modalService.messageOutput(error?.error?.message);
        this.modalService.isErrorOutput(true);
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
        this.modalService.messageOutput(error?.error?.message);
        this.modalService.isErrorOutput(true);
      },
    });
  }

  sortAndFilterBookings(bookings: IBooking[]) {
    const today = new Date().toISOString().split('T')[0];

    this.bookings = bookings.filter((booking) => booking.date >= today);
    this.bookingsCopy = bookings.filter((booking) => booking.date >= today);

    const parseDateTime = (booking: IBooking) => {
      const bookingDateTime = `${booking.date}T${booking.startTime}:00`;
      return new Date(bookingDateTime).getTime();
    };

    this.bookings.sort((a, b) => parseDateTime(a) - parseDateTime(b));
    this.bookingsCopy.sort((a, b) => parseDateTime(a) - parseDateTime(b));
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

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  stopProp(event: Event) {
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event) {
    this.isDropdownOpen = false;
  }

  addToFilterList(roomId: number, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    checkbox.checked
      ? this.filterList.push(roomId)
      : (this.filterList = this.filterList.filter((item) => item !== roomId));
  }

  filterBookings() {
    if (this.filterList.length <= 0) {
      this.bookings = this.bookingsCopy;
      return;
    }

    this.bookings = this.bookingsCopy.filter((booking) =>
      this.filterList.includes(booking.roomId)
    );
  }

  uncheckAll() {
    this.filterList = [];
    this.bookings = this.bookingsCopy;
  }

  selectBooking(bookingId: IBooking) {
    if (this.selectedBooking === bookingId) {
      this.selectedBooking = null;
      return;
    }

    this.selectedBooking = bookingId;
  }

  handleBooking() {
    if (!this.selectedBooking) return;

    this.dataSharingService.setBooking(this.selectedBooking);
    this.dataSharingService.setRooms(this.rooms);

    !this.selectedBooking.bookerName
      ? this.router.navigate(['/boka'])
      : this.router.navigate(['/avboka']);
  }
}
