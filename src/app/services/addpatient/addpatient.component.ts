import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Appointment } from '../../models/appointment';
import { Slots } from '../../models/slots';
import { DoctorService } from '../doctor.service';
import { UserService } from '../user.service';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrls: ['./addpatient.component.css']
})
export class AddpatientComponent implements OnInit {

 

 
  currRole = '';
  loggedUser = '';
  message = '';
  appointment = new Patient();
  slots : Observable<Slots[]> | undefined;
  doctors : Observable<Slots[]> | undefined;
  specializations : Observable<Slots[]> | undefined;
  defaultBirthday: string = '1990-01-01'; // Format: yyyy-MM-dd
  startDate = new Date(1990, 0, 1);
  constructor(private _service : DoctorService, private _router: Router, private userService : UserService) { }

  ngOnInit(): void
  {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');

    this.doctors = this._service.getSlotListWithUniqueDoctors();
    this.specializations = this._service.getSlotListWithUniqueSpecializations();
    this.slots = this._service.getSlotList();
    
    $('#messagecard').hide();
  }

   bookAppointment()
   {
  //   this.userService.addBookingAppointments(this.appointment).subscribe(
  //     data => {
  //       console.log("appointment booked Successfully");
  //       this._router.navigate(['/userdashboard']);
  //     },
  //     error => {
  //       console.log("process Failed");
  //       $('#appointmentform').hide();
  //       $('#messagecard').show();
  //       this.message = "There is a problem in Booking Your Appointment, Please check slot availability and try again !!!";
  //       console.log(error.error);
  //     }
  //   )
  }
}
