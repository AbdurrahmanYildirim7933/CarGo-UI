import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserRegDTO} from "./UserRegDTO";
import {Observable} from "rxjs";

@Injectable({
  providedIn : "root"
})

export class RegisterService{
baseUrl = "http//:localhost:8080";
  constructor(private httpClient: HttpClient) {
  }

  registerUser(userDto : UserRegDTO):Observable<Object>{
console.log(userDto);
return this.httpClient.post(`${this.baseUrl}/api/v1/user/create-user` ,userDto);

  }

}
