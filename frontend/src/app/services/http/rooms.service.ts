import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IRoom } from '../../interfaces/Rooms/IRoom.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  constructor(private http: HttpClient) {}

  getRooms(): Observable<IRoom[]> {
    return this.http.get<IRoom[]>(`${environment.restUrl}/rooms`);
  }
}
