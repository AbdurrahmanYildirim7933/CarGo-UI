import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  verifyUserByCode(id:string){
    return this.http.get("http://localhost:8080/api/v1/user/user-verify-by-code?userId="+id);
  }
}
