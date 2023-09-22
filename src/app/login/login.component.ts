
import {Component, OnInit} from '@angular/core';
import {UserDTO} from "./UserDTO";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {MyCookieService} from "./cookieService";
import {CookieService} from "ngx-cookie-service";
import {LoginService} from "./login.service";
import * as jsonpatch from 'fast-json-patch';
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
  private userIsAuthenticated: any;
  observer:any;
constructor(private http: HttpClient, private router:Router,private cookieService:CookieService,private loginService: LoginService) {
}

  ngOnInit() {
    this.loginService.getAuthStatusListener().subscribe((isAuthenticated:any)=>{
      this.userIsAuthenticated = isAuthenticated;
    });
    this.loginService.getAuthStatusListener().subscribe(i=>console.log("Oturum : "+i));
    this.observer=jsonpatch.observe(this.userIsAuthenticated);
  }
  login(): void{

  this.loginService.login(this.user);
    this.router.navigate(['/main-page']);
  }
  goToSignup(): void{
  debugger;

    this.router.navigate(['/signup']);
  }



}
