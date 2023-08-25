import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ShopDTO} from "./ShopDTO";
import {ProfileService} from "../profile/profile.service";
import {Observable} from "rxjs";
import {Garage} from "../garage/garage";
import {Operation} from "fast-json-patch";


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


/*
  sortByName(shop:ShopDTO) {
    const headers = this.profileService.createHeaders();
    console.log(headers)
    return this.httpClient.post<any[]>(`${this.apiUrl}/api/v1/shop/get-shop`, shop,{headers});


  }*/
  filterByName(shop: ShopDTO,page:number,size:number){
    const headers = this.profileService.createHeaders();
    console.log(headers)
    return this.httpClient.post<any[]>(`${this.apiUrl}/api/v1/shop/get-shop?page=${page}&size=${size}`,shop ,{headers});
  }

  updateShop(operations:Operation[],id:number){
    const headers = this.profileService.createHeaders();
    console.log(headers)
    return this.httpClient.patch<any[]>(`${this.apiUrl}/api/v1/shop/update-shop?id=${id}`,operations ,{headers});

  }
  showMessages(time:number){
    const headers = this.profileService.createHeaders();
    console.log(headers)
    return this.httpClient.get<any[]>(`${this.apiUrl}/api/v1/shop/check/`+time,{headers});

  }
  getShop(id:number):Observable<ShopDTO>{
    const headers = this.profileService.createHeaders();
    return this.httpClient.get<ShopDTO>(`${this.apiUrl}/api/v1/shop/get-shop/${id}`,{headers});
  }
}
