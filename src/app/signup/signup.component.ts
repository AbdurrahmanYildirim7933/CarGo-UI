import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignupService} from "./signup.service";
import {UserDTO} from "../login/UserDTO";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  data:any;
  user:UserDTO = new UserDTO();
  cpassword:string="";




  ngOnInit(){

  }

  signupForm: FormGroup;
  constructor(private signupService: SignupService, private router:Router,private toastrService:ToastrService) {

  }



  signUp(){
    if (this.user.validate() != ''){
      this.toastrService.error("Hata",this.user.validate())
    }else {
      this.signupService.registerUser(this.user).subscribe(
        res => {
          console.log("Kullanıcı başarıyla kaydedildi.");
          this.router.navigate(['/main-page']);
        },
        error => {
          console.log("Üzgünüz, kullanıcı kaydedilemedi.");
        }
      );

    }
            }



 /* constructor(private http: HttpClient,private cookie:CookieUtils, private router:Router) {}

  signup(): void {
    const user:UserRegDTO= new UserRegDTO();*/


    //this.router.navigate(['/main-page']);

  protected readonly onsubmit = onsubmit;
}

