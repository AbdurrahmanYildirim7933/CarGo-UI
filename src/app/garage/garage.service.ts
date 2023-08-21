import {Injectable, Input} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserDTO} from "../login/UserDTO";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Car} from "./car";
import {Garage} from "./garage";
import {PreloadingFeature, Router} from "@angular/router";
import {ProfileService} from "../profile/profile.service";
import {CookieService} from "ngx-cookie-service";
import {reportUnhandledError} from "rxjs/internal/util/reportUnhandledError";

@Injectable({
  providedIn: 'root'
})
export class GarageService {
  apiUrl="http://localhost:8080";

  user: UserDTO;
    public search = new BehaviorSubject<string>("");

  constructor(private router:Router,private httpClient: HttpClient,private profileService:ProfileService,private cookieService:CookieService) {
  }

  getGarages(page:number,size:number):Observable<Garage[]>{
    let url = `http://localhost:8080/api/v1/garage/garages-by-active-user?page=${page}&size=${size}`;
    const headers = this.profileService.createHeaders();
      return this.httpClient.get<Garage[]>(url,{headers});
  }

  getGarage(id:number):Observable<Garage>{
    const headers = this.profileService.createHeaders();
    return this.httpClient.get<Garage>(`${this.apiUrl}/api/v1/garage/get-garage/${id}`,{headers});
  }
  deleteGarage(id:number){
      const headers = this.profileService.createHeaders();
      return this.httpClient.delete(`${this.apiUrl}/api/v1/garage/delete-garage/${id}`,{headers});

  }
  createGarage (garage : Garage):Observable<Object>{
    const headers = this.profileService.createHeaders();
    console.log(garage);
    return this.httpClient.post(`${this.apiUrl}/api/v1/garage/create-garage` ,garage ,{headers});

  }

  updateGarage (id:number,garage : Garage):Observable<Object>{
    const headers = this.profileService.createHeaders();
    console.log(garage);
    return this.httpClient.patch(`${this.apiUrl}/api/v1/garage/update-garage/${id}` ,garage ,{headers});

  }

  sortByName() {
    const headers = this.profileService.createHeaders();
    console.log(headers)
    return this.httpClient.get<any[]>(`${this.apiUrl}/api/v1/garage/garages-by-active-user`, {headers});
  }

  private _listeners = new Subject<any>();
  listen():Observable<any>{
    return this._listeners.asObservable();
  }
  filter(filterBy:string){
    this._listeners.next(filterBy);
  }


}
