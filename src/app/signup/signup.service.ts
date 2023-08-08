import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserSgnDTO} from "./UserSgnDTO";

@Injectable({
  providedIn : "root"
})

export class SignupService{
baseUrl = "http//:localhost:8080";
  constructor(private httpClient: HttpClient) {
  }


  registerUser(userDto : UserSgnDTO):Observable<Object>{

console.log(userDto);
return this.httpClient.post(`${this.baseUrl}/api/v1/user/create-user` ,userDto);

  }

}
