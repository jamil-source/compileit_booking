import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IBooking } from '../../interfaces/Bookings/IBooking.interface';
import { IBookingPUTResponse } from '../../interfaces/Bookings/IBookingPUTResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  constructor(private http: HttpClient) {}

  getBookings(): Observable<IBooking[]> {
    return this.http.get<IBooking[]>(`${environment.restUrl}/bookings`);
  }

  putBooking(bookerName: string, id: number): Observable<IBookingPUTResponse> {
    if (!id) return null;

    const bodyData = { bookerName };

    return this.http.put<IBookingPUTResponse>(
      `${environment.restUrl}/bookings/${id}`,
      bodyData
    );
  }
}
