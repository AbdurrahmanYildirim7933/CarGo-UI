import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserSgnDTO} from "./UserSgnDTO";
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
  private router: any;
  ngOnInit(): void {
  }

  signupForm: FormGroup;
  constructor(private signupService: SignupService) {
    this.signupForm = new FormGroup({
        Password : new FormControl(null,[Validators.required]),
        ConfirmPassword : new FormControl(null)
      },{
        validators:matchpassword
      }
    )
  }
  // @ts-ignore
  userDto: UserSgnDTO = new UserSgnDTO();
  signup(){
    console.log(this.userDto);
    this.signupService.registerUser(this.userDto).subscribe(data => {alert("User is registered succesfully")},
      error => alert("Sorry user not registered"))

    this.router.navigate(['/main-page']);

  }

}
