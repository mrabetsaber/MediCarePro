import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationsuccessComponent } from './components/registrationsuccess/registrationsuccess.component';
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { DoctordashboardComponent } from './components/doctordashboard/doctordashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AddingdoctorComponent } from './components/addingdoctor/addingdoctor.component';
import { DoctorlistComponent } from './components/doctorlist/doctorlist.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { DoctorprofileComponent } from './components/doctorprofile/doctorprofile.component';
import { PatientlistComponent } from './components/patientlist/patientlist.component';
import { ApprovedoctorsComponent } from './components/approvedoctors/approvedoctors.component';
import { BookappointmentComponent } from './components/bookappointment/bookappointment.component';
import { ScheduleslotsComponent } from './components/scheduleslots/scheduleslots.component';
import { ApprovalstatusComponent } from './components/approvalstatus/approvalstatus.component';
import { CheckslotsComponent } from './components/checkslots/checkslots.component';
import { AddprescriptionComponent } from './components/addprescription/addprescription.component';
import { PrescriptionlistComponent } from './components/prescriptionlist/prescriptionlist.component';
import { WelcomepageComponent } from './components/welcomepage/welcomepage.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule, MatChipsModule, MatNativeDateModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';

import { CustomDateInputComponent } from './custom-date-input/custom-date-input.component';
import { RemoveTimePipe } from './custom-date-input/custom-date-input.component';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { AddpatientComponent } from './services/addpatient/addpatient.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddappointementComponent } from './components/addappointement/addappointement.component';
import { DialogComponent } from './components/dialog/dialog.component';

const appRoutes: Routes = [
  // Define your routes here
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    RegistrationsuccessComponent,
    UserdashboardComponent,
    AdmindashboardComponent,
    DoctordashboardComponent,
    FooterComponent,
    HeaderComponent,
    AddingdoctorComponent,
    DoctorlistComponent,
    UserlistComponent,
    AppointmentsComponent,
    UserprofileComponent,
    DoctorprofileComponent,
    PatientlistComponent,
    ApprovedoctorsComponent,
    BookappointmentComponent,
    ScheduleslotsComponent,
    ApprovalstatusComponent,
    CheckslotsComponent,
    AddprescriptionComponent,
    PrescriptionlistComponent,
    WelcomepageComponent,
    CustomDateInputComponent,
    AddpatientComponent,
    SidebarComponent,
    AddappointementComponent,
    RemoveTimePipe,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    SidebarModule,
    NavbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    NgxPaginationModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    AdminLayoutModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDialogModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent, RegistrationComponent]
})
export class AppModule { }
