import { Component, OnInit ,HostListener } from '@angular/core';
import { BehaviorSubject, Observable, concat, map, of, take } from 'rxjs';
import { Slots } from '../../models/slots';
import { Patient } from 'src/app/models/patient';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { AppointementService } from 'src/app/services/appointement.service';
import { Appointment } from 'src/app/models/appointment';
import { Operation } from 'src/app/models/operation';
import { DoctorService } from '../../services/doctor.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ElementRef, ViewChild, inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { startWith} from 'rxjs/operators';

import {LiveAnnouncer} from '@angular/cdk/a11y';
import { DocumentService } from '../../services/document.service';
import {  MatDialog} from '@angular/material/dialog';
import { CustomDocument } from 'src/app/models/document';
import { ReportsService } from 'src/app/services/reports.service';






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
  private documentsSubject = new BehaviorSubject<CustomDocument[]>([]);
  patients : Observable<Patient[]> = this.patientsSubject.asObservable();
  operations : Observable<Operation[]> = this.operationsSubject.asObservable();
  slots : Observable<Slots[]> | undefined;
  responses : Observable<any> | undefined;
  appointement=new Appointment();
  operationsList: Operation[] = [];
  oldAppointementList:Appointment[]=[];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]> | undefined;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = [];
  showModal = false;
  @ViewChild('fruitInput')
  fruitInput!: ElementRef<HTMLInputElement>;
  selectedFile!: File;
  announcer = inject(LiveAnnouncer);
  documentList: CustomDocument[] = [];
  documents : Observable<CustomDocument[]> = this.documentsSubject.asObservable();
  patient:Patient= new Patient();
  currentOperation:Operation=new Operation();

  constructor( public dialog: MatDialog, private documentService: DocumentService,private patientService : PatientServiceService,private appointementService : AppointementService,private doctorService : DoctorService ,private reportService: ReportsService) { 
   
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
  }
 
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
  
    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }
  
    // Clear the input value
    if (event.input) {
      event.input.value = '';
    }
  
    // Reset the form control
    this.fruitCtrl.setValue(null);
  }
  trackFruit(index: number, fruit: any): any {
    return fruit; // or return fruit.id; if you have a unique identifier like id
  }
  
  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  
 

 

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


  downloadReport() {
    this.reportService.generateReport()
      .subscribe((blob: Blob | MediaSource) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'report.pdf';
        link.click();
      });
  }


  saveAppointement(): void {
    if (this.patient && this.patient.dateNaissance) {
      const date = new Date(this.patient.dateNaissance);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
      const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed
      
      const formattedDate = `${year}-${month}-${day}`;
      
      this.patient.dateNaissance=formattedDate;
    } else {
      
    }
    this.operations.subscribe(
      (operations: Operation[]) => {
        this.appointement.operations = this.appointement.operations.concat(operations);
      },
      (error) => {
        console.error('Error fetching operations:', error); // Handle error if any
      }
    );
    
    

    this.patient.appointments.push(this.appointement);
    this.patientService.savePatient(this.patient)
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
    this.patient = {
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
      dateNaissanceFilter:'',
      appointments:[]
    };
  //  this.fetchPatients(); // Optionally, you can reload the patient list after clearing the form
  }

  
  verifierPatient() {
    if (this.patient && this.patient.dateNaissance) {
      const date = new Date(this.patient.dateNaissance);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
      const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed
      
      const formattedDate = `${year}-${month}-${day}`;
      
      this.patient.dateNaissanceFilter=formattedDate;
    } else {
      
    }
    
   

    this.patientService.verifyPatient(this.patient).subscribe({
      next: patients => {
        const firstPatient = patients[0];
        if(firstPatient){
          this.patient = firstPatient;

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
        dateNaissanceFilter:'',
        appointments:[]
      };
  
      const updatedPatients = [...patients, newPatient];
      this.patientsSubject.next(updatedPatients);
    });
  }
  
  addOperation() {
    this.operations.subscribe(
      (operations: Operation[]) => {
        this.operationsList = operations; // Assign the received operations to the operationsList array
        this.addEmptyOperation(); // Call the method to add a new empty patient
        this.operations = of(this.operationsList);
      },
      (error) => {
        console.error('Error fetching operations:', error); // Handle error if any
      }
    );
  }
  addEmptyOperation() {
    const newPatient: Operation = {
      id:'',
      date: new Date(),
      observarions: '',
      // appointment:this.appointement,
      documents:[]
     
    };
    this.operationsList.push(newPatient);
    this.operationsList.reverse()
}
 
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }
  

  onUpload(index: number): void {
    if (!this.selectedFile) {
      return;
    }
  
    this.documentService.uploadFile(this.selectedFile).subscribe({
      next: (response: any) => {
        console.log('Upload successful:', response);
        if (this.currentOperation.documents.length > index) {
          this.currentOperation.documents[index] = response;
        
        } else {
          console.error('Index out of range:', index);
        }
      },
      error: (error: any) => {
        console.error('Upload failed:', error);
      }
    });
  }
  
downloadFile(fileName: string): void {
  this.documentService.downloadFile(fileName).subscribe(
    (blob: Blob) => {
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    },
    error => {
      console.error('Download failed:', error);
      // Handle the error as needed
    }
  );
}

deleteOperation(index: number) {
  this.operationsList.splice(index, 1);
}



 
    openModal(index: number) {
      // Clone the operation object to ensure each operation has its own instance
      this.currentOperation = this.operationsList[index];
      this.showModal = true;
      this.documents = of(this.currentOperation.documents);
  }
   
  closeModal(): void {
   
    
    this.showModal = false;
  }
  addDocument() {
    const newDocument: CustomDocument = new CustomDocument(); 
    this.currentOperation.documents.push(newDocument);
   
  }
 




deleteDocument(index: number) {
  this.currentOperation.documents.splice(index, 1);
}

// @HostListener('document:click', ['$event'])
//   onClick(event: MouseEvent) {
//     if (this.iisClickInsideModal(event)) {
//       this.closeModal();
//       console.log('closing ');
//     }
//   }

//   iisClickInsideModal(event: MouseEvent): boolean {
//     const modalElement = document.querySelector('.modal');
//     return modalElement !== null && modalElement.contains(event.target as Node);
//   }
  
}
