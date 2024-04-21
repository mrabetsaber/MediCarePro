import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Prescription } from '../models/prescription';
import { Slots } from '../models/slots';
import { User } from '../models/user';
import { Appointment } from 'src/app/models/appointment';
const NAV_URL = environment.apiURL;
@Injectable({
  providedIn: 'root'
})

export class AppointementService {

  constructor(private _http : HttpClient) { }

  appointement = new Appointment();
  saveAppointement(appointement : Appointment) : Observable<any>
  {
      return this._http.post<any>(`${NAV_URL}/appointement/addAppointement`,appointement)
  }

}
