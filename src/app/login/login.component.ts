
import { Component } from '@angular/core';
import {UserDTO} from "./UserDTO";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieUtils} from "./cookieUtils";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {MyCookieService} from "./cookieService";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
email: string;
password: string;
apiUrl="http://localhost:8080";
  public token: string ='';
  user: UserDTO = new UserDTO();
constructor(private http: HttpClient,private cookie:CookieUtils, private router:Router,private cookieService:CookieService) {
}
  login(): void{


    this.http.post<any>(`${this.apiUrl}/api/v1/auth/login`, this.user).subscribe(
      (response) => {
        this.cookieService.set("MyCookie",response["token"],1,);
        console.log('Kullanıcı girişi başarılı:', response);
        this.router.navigate(['/main-page']);

      },
      (error) => {
        // Backend'den gelen hata durumlarını burada işleyebilirsiniz
        console.error('Kullanıcı girişi başarısız:', error);
      }

    );




    /*if (!this.loginUser.email || this.loginUser.email == ''){
      console.log("hataaaaaaa")
      return;
    }
    console.log(this.loginUser.email) */

  }
  goToSignup(): void{

    this.router.navigate(['/signup']);
  }



}
