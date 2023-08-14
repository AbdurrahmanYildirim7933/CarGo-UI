
import {Component, OnInit} from '@angular/core';
import {UserDTO} from "./UserDTO";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {MyCookieService} from "./cookieService";
import {CookieService} from "ngx-cookie-service";
import {LoginService} from "./login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
email: string;
password: string;
apiUrl="http://localhost:8080";
  public token: string ='';
  user: UserDTO = new UserDTO();
constructor(private http: HttpClient, private router:Router,private cookieService:CookieService,private loginService: LoginService) {
}

  ngOnInit() {

  }
  login(): void{

  this.loginService.login(this.user);

  }
  goToSignup(): void{

    this.router.navigate(['/signup']);
  }



}
