import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map, of, take } from 'rxjs';
import { Slots } from '../../models/slots';
import { Patient } from 'src/app/models/patient';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AppointementService } from 'src/app/services/appointement.service';
import { Appointment } from 'src/app/models/appointment';
import { Operation } from 'src/app/models/operation';
import { DoctorService } from '../../services/doctor.service';
@Component({
  selector: 'app-addappointement',
  templateUrl: './addappointement.component.html',
  styleUrls: ['./addappointement.component.css']
})
export class AddappointementComponent implements OnInit {

  currRole = '';
  loggedUser = '';
  private patientsSubject = new BehaviorSubject<Patient[]>([]);
  private operationsSubject = new BehaviorSubject<Operation[]>([]);
  patients : Observable<Patient[]> = this.patientsSubject.asObservable();
  operations : Observable<Operation[]> = this.operationsSubject.asObservable();
  slots : Observable<Slots[]> | undefined;
  responses : Observable<any> | undefined;
  appointement=new Appointment();
  patientsList: Operation[] = [];



  
  constructor(private patientService : PatientServiceService,private appointementService : AppointementService,private doctorService : DoctorService) { }

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

  saveAppointement(): void {
    if (this.appointement.patient && this.appointement.patient.dateNaissance) {
      const date = new Date(this.appointement.patient.dateNaissance);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
      const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed
      
      const formattedDate = `${year}-${month}-${day}`;
      
      this.appointement.patient.dateNaissance=formattedDate;
    } else {
      
    }
    // Assuming appointementService.saveAppointement returns an Observable or Promise
    this.appointementService.saveAppointement(this.appointement)
      .subscribe({
        next: response => {
          // Handle successful response (e.g., update UI, store data)
          this.patients = response; // Assuming response is appropriate for patients
        }, error: error => {
          console.error("Error occurred:", error);
        }
  });
  }

  clearForm(): void {
    this.appointement.patient = {
      id:'',
      nom: '',
      prenom: '',
      region: '',
      numTel: '',
      dateNaissance: '',
      profession: '',
      couvertureSocial: '',
      gender: '',
      numDossier:'',
      dateNaissanceFilter:''
    };
  //  this.fetchPatients(); // Optionally, you can reload the patient list after clearing the form
  }
  onDateChange(event: MatDatepickerInputEvent<Date>) {
    console.log("event", event);
    if (event.value !== null) {
     // this.appointement.patient.dateNaissance = event.value.toString();
    } else {
      // Handle the case where the value is null
    }
  }
  transform(value: string): string {
    if (!value) return value;
    return value.split('T')[0]; // Split at 'T' and take the first part (date)
  }
  verifierPatient() {
    if (this.appointement.patient && this.appointement.patient.dateNaissance) {
      const date = new Date(this.appointement.patient.dateNaissance);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
      const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed
      
      const formattedDate = `${year}-${month}-${day}`;
      
      this.appointement.patient.dateNaissanceFilter=formattedDate;
    } else {
      
    }
    
   

    this.patientService.verifyPatient(this.appointement.patient).subscribe({
      next: patients => {
        const firstPatient = patients[0];
        if(firstPatient){
          this.appointement.patient = firstPatient;

        }else{
          this.clearForm();
        }
        console.log("this.appointement", this.appointement);
      },
      error: error => {
        console.error("Error occurred:", error);
      }
    });
  }
  
  addNewRow(): void {
    this.patients.pipe(take(1)).subscribe(patients => {
      const newPatient: Patient = {
        id:'',
        nom: '',
        prenom: '',
        region: '',
        numTel: '',
        dateNaissance: '',
        profession: '',
        couvertureSocial: '',
        gender: '',
        numDossier:'',
        dateNaissanceFilter:''
      };
  
      const updatedPatients = [...patients, newPatient];
      this.patientsSubject.next(updatedPatients);
    });
  }
  
  loadPatients() {
    this.operations.subscribe(
      (patients: Operation[]) => {
        this.patientsList = patients; // Assign the received patients to the patientsList array
        this.addEmptyPatient(); // Call the method to add a new empty patient
        this.operations = of(this.patientsList);
      },
      (error) => {
        console.error('Error fetching patients:', error); // Handle error if any
      }
    );
  }
  addEmptyPatient() {
    const newPatient: Operation = {
      id:'',
      date: new Date(),
      observarions: '',
     
    };
    this.patientsList.push(newPatient);
    this.patientsList.reverse()
}
}
