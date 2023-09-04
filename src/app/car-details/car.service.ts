import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Car} from "./car";
import {ProfileService} from "../profile/profile.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Garage} from "../garage/garage";
import {Operation} from "fast-json-patch";
import {CookieService} from "ngx-cookie-service";
import {Brand} from "./brand";
import {Model} from "./model";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl="http://localhost:8080";
  token:any= this.cookieService.get("MyCookie");
  constructor(private profileService:ProfileService,private httpClient:HttpClient,private cookieService:CookieService) { }

  getCar(id:number):Observable<Car>{
    const headers = this.profileService.createHeaders();
    return this.httpClient.get<Car>(`${this.apiUrl}/api/v1/car/get-car/${id}`,{headers});
  }

  getCars(garage:Garage,page:number,size:number):Observable<Car[]>{
    let url = `http://localhost:8080/api/v1/car/${garage.id}/cars?page=${page}&size=${size}`;
    const headers = this.profileService.createHeaders();
    return this.httpClient.get<Car[]>(url,{headers});
  }

  filter(car: Car,garageId:number,page:number,size:number){
    const headers = this.profileService.createHeaders();
    console.log(headers)
    return this.httpClient.post<any>(`${this.apiUrl}/api/v1/car/${garageId}/cars?page=${page}&size=${size}`,car,{headers});
  }

  deleteCar(id:number){
    const headers = this.profileService.createHeaders();
    return this.httpClient.delete(`${this.apiUrl}/api/v1/car/delete-car/${id}`,{headers});

  }
  createCar (garageId: number,car : Car):Observable<Object>{
    const headers = this.profileService.createHeaders();
    console.log(car);
    return this.httpClient.post(`${this.apiUrl}/api/v1/car/${garageId}/create-car` ,car ,{headers});
  }

  updateCar (id:number,operations:Operation[]):Observable<Object>{
    const headers = this.createPatchHeaders();
    return this.httpClient.patch(`${this.apiUrl}/api/v1/car/update-car/${id}` ,operations ,{headers});
  }

  createPatchHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json-patch+json',
    });
    headers = headers.append('Authorization', `Bearer ${(this.token)}`);
    return headers;
  }

  getBrand(id:number):Observable<Brand>{
    const headers = this.profileService.createHeaders();
    return this.httpClient.get<Brand>(`${this.apiUrl}/api/v1/car/get-brand/${id}`,{headers});
  }

  getBrands():Observable<Brand[]>{
    let url = `http://localhost:8080/api/v1/car/brands`;
    const headers = this.profileService.createHeaders();
    return this.httpClient.get<Brand[]>(url,{headers});
  }

    getModel(id:number):Observable<Model>{
        const headers = this.profileService.createHeaders();
        return this.httpClient.get<Model>(`${this.apiUrl}/api/v1/car/get-model/${id}`,{headers});
    }

  getModels(brandId:number):Observable<Model[]>{

    let url = `http://localhost:8080/api/v1/car/${brandId}/models`;
    const headers = this.profileService.createHeaders();
    return this.httpClient.get<Model[]>(url,{headers});
  }

}
