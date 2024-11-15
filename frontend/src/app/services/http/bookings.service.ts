import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IBooking } from '../../interfaces/Bookings/IBooking.interface';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  constructor(private http: HttpClient) {}

  getBookings(): Observable<IBooking[]> {
    return this.http.get<IBooking[]>(`${environment.restUrl}/bookings`);
  }
}
