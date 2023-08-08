import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserSign} from "./UserSign";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {matchpassword} from "./matchpassword.validator";
import {SignupService} from "./signup.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  data:any;
  message:any;
  status:any;

  ngOnInit(){
    this.signupForm = new FormGroup({
      name : new FormControl('' , Validators.required),
      lastName : new FormControl('' , Validators.required),
      email : new FormControl('' , Validators.required),
      phone : new FormControl('' , Validators.required),
      identityNumber : new FormControl('' , Validators.required),
      password : new FormControl('' , Validators.required),
      confirmPassword : new FormControl('' , Validators.required),

    },{
      validators:matchpassword
    });
  }

  signupForm: FormGroup;
  constructor(private signupService: SignupService, private router:Router) {

  }

  // @ts-ignore
  user : UserSign = new UserSign();

  signUp(){
    this.user.name = this.signupForm.get('name')?.value;
    this.user.lastName = this.signupForm.get('lastName')?.value;
    this.user.email = this.signupForm.get('email')?.value;
    this.user.phone = this.signupForm.get('phone')?.value;
    this.user.password = this.signupForm.get('password')?.value;
    this.user.identityNumber = this.signupForm.get('identityNumber')?.value;
    console.log(this.user);
    this.signupService.registerUser(this.user).subscribe(data => {alert("User is registered succesfully")},
      error => alert("Sorry user not registered"))
    this.signupForm.patchValue({
      user: this.user
    })

    this.router.navigate(['/main-page']);

  }

}
