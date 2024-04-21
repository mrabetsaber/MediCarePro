import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Slots } from '../../models/slots';
import { Patient } from 'src/app/models/patient';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DoctorService } from '../../services/doctor.service';
@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.css']
})
export class PatientlistComponent implements OnInit {

  currRole = '';
  loggedUser = '';
  patients : Observable<Patient[]> | undefined;
  slots : Observable<Slots[]> | undefined;
  responses : Observable<any> | undefined;
  filterValue=new Patient();
  constructor(private _service : PatientServiceService,private doctorService : DoctorService) { }

  displayedColumns: string[] = ['nom', 'prenom', 'region', 'numTel', 'dateNaissance', 'profession', 'couvertureSocial', 'gender'];

  ngOnInit(): void
  {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');

    if(this.currRole === "user")
    {
      this.patients = this.doctorService.getPatientListByDoctorEmail(this.loggedUser);
    }
    else
    {
      this.patients = this.doctorService.getPatientList();
    }
    this.slots = this.doctorService.getSlotDetails(this.loggedUser);
  }

  acceptRequest(slot : string)
  {
    this.responses = this.doctorService.acceptRequestForPatientApproval(slot);
    $("#acceptbtn").hide();
    $("#rejectbtn").hide();
    $("#acceptedbtn").show();
    $("#rejectedbtn").hide();
  }

  rejectRequest(slot : string)
  {
    this.responses = this.doctorService.rejectRequestForPatientApproval(slot);
    $("#acceptbtn").hide();
    $("#rejectbtn").hide();
    $("#acceptedbtn").hide();
    $("#rejectedbtn").show();
  }

  fetchPatients(): void {
    this.patients = this._service.searchPatients(this.filterValue);
  }
  clearForm(): void {
    this.filterValue = {
      id:'',
      nom: '',
      prenom: '',
      region: '',
      numTel: '',
      dateNaissance:'',
      profession: '',
      couvertureSocial: '',
      gender: '',
      numDossier:'',
      dateNaissanceFilter:''
    };
    this.fetchPatients(); // Optionally, you can reload the patient list after clearing the form
  }
  onDateChange(event: MatDatepickerInputEvent<Date>) {
    console.log("event", event);
    if (event.value !== null) {
     // this.filterValue.dateNaissance = event.value.toString();
    } else {
      // Handle the case where the value is null
    }
  }
  
}
