import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenInterceptor} from "../api-interceptor.service";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  footerApiUrl = 'http://localhost:8080/api/v1/user/get-client-ip';


  apiUrl="http://localhost:8080";
  token :String = this.cookieService.get("MyCookie");
  constructor(private http: HttpClient,private tokenInterceptor:TokenInterceptor,private cookieService:CookieService) {

  }
  getIpm(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.apiUrl}/api/v1/user/get-client-ip`,{ headers });

  }
  private createHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    headers = headers.append('Authorization', `Bearer ${(this.token)}`);

    return headers;
  }
}
