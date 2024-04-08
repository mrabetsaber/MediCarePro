import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { PatientFormComponent } from './views/patient/patient-form/patient-form.component';
import { PatientListComponent } from './views/patient/patient-list/patient-list.component';

const routes: Routes = [
{
  path:'',
  redirectTo:'dashboard',
  pathMatch:'full'
},
{
  path:'dashboard',
  component:DashboardComponent
},
{
  path:'newPatient',
  component:PatientFormComponent
},
{
  path:'patientList',
  component:PatientListComponent
}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
