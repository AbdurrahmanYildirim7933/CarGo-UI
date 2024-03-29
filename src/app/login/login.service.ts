import {Injectable, OnInit} from '@angular/core';
import {UserDTO} from "./UserDTO";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  email: string;
  apiUrl="http://localhost:8080";
  public token: string ='';
  isLoggedin: boolean = false;
  private authStatusListener:Subject<boolean> = new Subject<boolean>();
  constructor(private http: HttpClient, private router:Router,private cookieService:CookieService) {
  }



  login(user:UserDTO): void {

    this.http.post<any>(`${this.apiUrl}/api/v1/auth/login`, user).subscribe(
      (response) => {
        this.cookieService.set("MyCookie", response["token"], 1);
        document.cookie
        console.log('Kullanıcı girişi başarılı:', response);
        this.authStatusListener.next(true);
        this.isLoggedin = true;

      },
      (error) => {
        // Backend'den gelen hata durumlarını burada işleyebilirsiniz
        console.error('Kullanıcı girişi başarısız:', error);

      }
    );
  }

  logout() {
    // remove user from local storage to log user out
    this.cookieService.delete("MyCookie");
    this.isLoggedin = false;
    this.authStatusListener.next(false);
  }


  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }


}
