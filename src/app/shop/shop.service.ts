import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ShopDTO} from "./ShopDTO";
import {CookieService} from "ngx-cookie-service";
import {ProfileService} from "../profile/profile.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  apiUrl = "http://localhost:8080";

  constructor(private httpClient: HttpClient, private profileService: ProfileService) {
  }

  getToken() {
    let _token = "";
    let cookies = document.cookie.split("; ");
    for (let index = 0; index < cookies.length; index++) {
      let cookie = cookies[index].split("=")
      if (cookie[0] == "MyCookie") {
        _token = cookie[1]
      }
    }
    return _token;
  }

  loadShops(page: number, size: number) {

    const headers = this.profileService.createHeaders();
    console.log(headers)
    /*  const _headers = new HttpHeaders({
        'Authorization': `Bearer ${this.getToken()}`
      });*/
    //console.log(_headers)
    return this.httpClient.get<any[]>(
      `${this.apiUrl}/api/v1/shop/get-shop?page=${page}&size=${size}`, {headers});
    ;
  }

  sortByName() {
    const headers = this.profileService.createHeaders();
    console.log(headers)
    return this.httpClient.get<any[]>(`${this.apiUrl}/api/v1/shop/get-shop`, {headers});


  }

}
