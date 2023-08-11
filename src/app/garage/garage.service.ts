import {Injectable, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserDTO} from "../login/UserDTO";
import {Observable} from "rxjs";
import {Car} from "./car";
import {Garage} from "./garage";

@Injectable({
  providedIn: 'root'
})
export class GarageService {
  apiUrl="http://localhost:8080";

  user: UserDTO;
  user_garages:Garage[];
  constructor(private httpClient: HttpClient) {
  }

  getGarages(userId:bigint):Garage[]{

    console.log(this.user_garages);
    // @ts-ignore
    this.user_garages = this.httpClient.get(`${this.apiUrl}/api/v1/garage/users/${userId}/garages`);
    return this.user_garages;

  }

}
