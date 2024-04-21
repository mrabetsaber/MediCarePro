import { Patient } from '../models/patient';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
export class PatientServiceService {


  user = new User();
  doctor = new Patient();

  constructor(private _http : HttpClient) { }

 

  searchPatients(doctor : Patient) : Observable<any>
  {
      return this._http.post<any>(`${NAV_URL}/patient/search`,doctor)
  }

  findPatientByNumTel(numTel: string): Observable<Patient[]> {
    return this._http.get<Patient[]>(`${NAV_URL}/patient/searchPatientsByNumTel?numTel=${numTel}`);
  }

  verifyPatient(patient: Patient): Observable<any> {
    return this._http.post<any>(`${NAV_URL}/patient/verifyPatient`, patient);
  }
  
 

}
