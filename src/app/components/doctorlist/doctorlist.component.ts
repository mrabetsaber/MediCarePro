import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css']
})
export class DoctorlistComponent implements OnInit {

  doctors : Observable<Doctor[]> | undefined;

  constructor(private _service : DoctorService) { }

  ngOnInit(): void
  {
    this.doctors = this._service.getDoctorList();
  }

}
