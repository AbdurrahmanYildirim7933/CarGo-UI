
import { Component } from '@angular/core';
import {UserDTO} from "./UserDTO";
import {HttpClient} from "@angular/common/http";
import {CookieUtils} from "./cookieUtils";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
email: string;
password: string;
apiUrl="http://localhost:8080";

constructor(private http: HttpClient,private cookie:CookieUtils, private router:Router) {
}
  login(): void{
    const user: UserDTO = new UserDTO();

    this.http.post<any>(`${this.apiUrl}/api/v1/auth/login`, user).subscribe(
      (response) => {
        this.cookie.setCookie("CARGO_TOKEN",response["token"],1,"/login")
        console.log('Kullanıcı girişi başarılı:', response);
      },
      (error) => {
        // Backend'den gelen hata durumlarını burada işleyebilirsiniz
        console.error('Kullanıcı girişi başarısız:', error);
      }

    );

    this.router.navigate(['/main-page']);


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
