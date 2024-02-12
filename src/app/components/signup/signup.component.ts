import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { ModeService } from 'src/app/services/mode.service';
import { SignupService } from 'src/app/services/signup.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  currentMode = 'light';
  termsAccepted = false;

  public user: User = {
    email: '',
    userName: '',
    password: '',
    phoneNumber: '9818',
    securityQuestion:'',
    securityAnswer:'',
    role: 'USER'
  };
  

  constructor(private userService: SignupService, private snack: MatSnackBar, private router: Router, private modeService: ModeService) {}

  ngOnInit(): void {

    // Subscribe to mode changes
    this.modeService.currentMode$.subscribe((mode) => {
     this.currentMode = mode;
   //  console.log("MODE SignUp"+ this.currentMode);
     
   });
 }

  formSubmit() {
    // if (!this.user.email || !this.user.email.trim()) {
    //   this.snack.open('Email is required!!', '', { duration: 3000 });
    //   return;
    // }
    // console.log("user", this.user.email,"  ", this.user.password,"  ", this.user.phone,"  ", this.user.role, " ", this.user.username);
    

    this.userService.addUser(this.user).subscribe(
      () => {
        //console.log(data);
       // console.log('User Registered Successfully');
       Swal.fire('Success', 'User Registered Successfully!!' , 'success')
       // this.snack.open('User Registered Successfully!!', '', { duration: 4000 });
        this.router.navigate(['/login']);
      },
      (error) => {
        //console.log(error);

        let errorMessage = 'Something went wrong';

        if (error && error.error && error.error.message) {
          // Check if there is a custom error message from the server
          errorMessage = error.error.message;
        }

      //  this.snack.open(errorMessage, '', { duration: 3000 });
      Swal.fire('Error', errorMessage, 'error')
      }
    );
  }

  canExit():boolean{
    if(this.user.email.trim()=='' || this.user.password.trim()=='' || this.user.securityAnswer.trim()==''
       || this.user.securityQuestion.trim()=='' || this.user.userName.trim()=='')
    {
      return confirm('you have unsaved changes');
    }
    else
    {
      return true;
    }
  }
}
