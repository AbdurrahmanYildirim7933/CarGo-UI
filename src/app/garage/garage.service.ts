import {Injectable, Input} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserDTO} from "../login/UserDTO";
import {Observable} from "rxjs";
import {Car} from "./car";
import {Garage} from "./garage";
import {PreloadingFeature} from "@angular/router";
import {ProfileService} from "../profile/profile.service";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class GarageService {
  apiUrl="http://localhost:8080";

  user: UserDTO;

  constructor(private httpClient: HttpClient,private profileService:ProfileService,private cookieService:CookieService) {
  }

  getGarages(userId: number):Observable<any[]>{
    const headers = this.profileService.createHeaders();
    return this.httpClient.get<Garage[]>(`${this.apiUrl}/api/v1/garage/users/${userId}/garages`,{headers});

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

}
