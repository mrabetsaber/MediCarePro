import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../../models/doctor';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  doctor = new Doctor();
  msg = "";
  adminEmail = "";
  adminPassword = "";
  showUserLoginForm = true; // Initially show user login form
  showAdminLoginForm = false;
  showDoctorLoginForm = false;
  constructor(private _service : LoginService, private _router : Router) { }

  ngOnInit(): void 
  {
    
  }
  onUserLoginClick() {
    this.showUserLoginForm = true;
    this.showAdminLoginForm = false;
    this.showDoctorLoginForm = false;
    // Update button styles (see CSS code)
  }

  onAdminLoginClick() {
    this.showUserLoginForm = false;
    this.showAdminLoginForm = true;
    this.showDoctorLoginForm = false;
    // Update button styles (see CSS code)
  }

  onDoctorLoginClick() {
    this.showUserLoginForm = false;
    this.showAdminLoginForm = false;
    this.showDoctorLoginForm = true;
    // Update button styles (see CSS code)
  }
  loginUser()
  {
      this._service.loginUserFromRemote(this.user).subscribe(
        (data: any) => {
          console.log(data);
          console.log("Response Received");
          sessionStorage.setItem('loggedUser', this.user.email);
          sessionStorage.setItem('USER', "user");
          sessionStorage.setItem('ROLE', this.user.role);
          sessionStorage.setItem('name', this.user.username);
          sessionStorage.setItem('gender', this.user.gender);
          if(this.user.role=="USER"){

            this._router.navigate(['/userdashboard']);
          }else if(this.user.role=="doctor"){

            this._router.navigate(['/doctordashboard']);
          }else if(this.user.role=="admin"){
            this._router.navigate(['/admindashboard']);
          }
        },
        (error: { error: any; }) => {
          console.log(error.error);
          this.msg="La connexion a échoué. Veuillez vérifier vos identifiants et réessayer !!!";
        }
      )
  }

  loginDoctor()
  {
      this._service.loginDoctorFromRemote(this.doctor).subscribe(
        (data: any) => {
          console.log(data);
          console.log("Response Received");
          sessionStorage.clear();
          sessionStorage.setItem('loggedUser', this.doctor.email);
          sessionStorage.setItem('USER', "doctor");
          sessionStorage.setItem('ROLE', "doctor");
          sessionStorage.setItem('doctorname',this.doctor.email);
          sessionStorage.setItem('gender', "male");
          this._router.navigate(['/doctordashboard']);
        },
        (error: { error: any; }) => {
          console.log(error.error);
          this.msg="Bad credentials, please enter valid credentials !!!";
        }
      )
  }

  adminLogin()
  {
    if(this._service.adminLoginFromRemote(this.adminEmail, this.adminPassword)) 
    {
      sessionStorage.setItem('loggedUser', this.adminEmail);
      sessionStorage.setItem('USER', "admin");
      sessionStorage.setItem('ROLE', "admin");
      sessionStorage.setItem('name', "admin");
      sessionStorage.setItem('gender', "male");
      this._router.navigate(['/admindashboard']);
    }
    else 
    {
      console.log("Exception Occured");
      this.msg = 'Bad admin credentials !!!'
    }
  }

}
