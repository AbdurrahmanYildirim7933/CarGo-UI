
import { Component } from '@angular/core';
import {UserDTO} from "./UserDTO";
import {HttpClient} from "@angular/common/http";
import {CookieUtils} from "./cookieUtils";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
email: string;
password: string;
apiUrl="http://localhost:8080";

constructor(private http: HttpClient,private cookie:CookieUtils) {
}
  login(): void{
    const user: UserDTO = new UserDTO(this.email, this.password);

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


    /*if (!this.loginUser.email || this.loginUser.email == ''){
      console.log("hataaaaaaa")
      return;
    }
    console.log(this.loginUser.email) */

  }

}
