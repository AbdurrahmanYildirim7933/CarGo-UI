import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignupService} from "./signup.service";
import {UserDTO} from "../login/UserDTO";
import {positionElements} from "ngx-bootstrap/positioning";
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
  code:string=""




  ngOnInit(){
    //this.toastrService.error("hata");

  }

  signupForm: FormGroup;
  constructor(private signupService: SignupService,
              private router:Router,
              private toastrService:ToastrService
              ) {

  }
//private toastrService:ToastrService
  verifyCodeEntry:boolean;

  sendVerifyCode(){
    this.signupService.sendVerifyCode(this.user).subscribe(res=>{
      console.log("Code başarılı");
      console.log(res);
      this.router.navigate(["/main-page"]);
    })
  }
  signUp(){

    if (this.user.validate() != ''){
      this.toastrService.error("Hata",this.user.validate())
 debugger
    }else {
      this.signupService.registerUser(this.user).subscribe(
        res => {
          console.log("Kullanıcı başarıyla kaydedildi.");
          this.verifyCodeEntry = true;
          this.user = new UserDTO();
          this.user.mapper(res);

        },
        error => {
          console.log("Üzgünüz, kullanıcı kaydedilemedi.");
        }
      );

    }

  }

  getCode(){
    this.signupService.getCode(this.user).subscribe(
      (response: any) => {
        this.code = response["code"];
        console.log(response);
      },
      (error: any) => {
        console.error('Error retrieving profile data');

      }
    );
  }


  /* constructor(private http: HttpClient,private cookie:CookieUtils, private router:Router) {}

   signup(): void {
     const user:UserRegDTO= new UserRegDTO();*/


  //this.router.navigate(['/main-page']);

  protected readonly onsubmit = onsubmit;
}
