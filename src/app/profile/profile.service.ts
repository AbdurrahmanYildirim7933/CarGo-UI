import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProfileDetails} from "./profiledetails";
import {CookieService} from "ngx-cookie-service";
import {TokenInterceptor} from "../api-interceptor.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  apiUrl="http://localhost:8080";
  token :String = this.cookieService.get("MyCookie");
  constructor(private http: HttpClient,private tokenInterceptor:TokenInterceptor,private cookieService:CookieService) {

  }

    profile(): Observable<any> {
        const headers = this.createHeaders();
        return this.http.get(`${this.apiUrl}/api/v1/auth/me`,{ headers });

    }

    createHeaders(): HttpHeaders {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

            headers = headers.append('Authorization', `Bearer ${(this.token)}`);

        return headers;
    }


}
