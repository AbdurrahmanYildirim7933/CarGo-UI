import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserSign} from "./UserSign";

@Injectable({
  providedIn : "root"
})

export class SignupService{
  apiUrl="http://localhost:8080";

  constructor(private httpClient: HttpClient) {
  }


  registerUser(userDto : UserSign):Observable<Object>{

console.log(userDto);
return this.httpClient.post(`${this.apiUrl}/api/v1/user/create-user` ,userDto);

  }

}
