import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDTO} from "../login/UserDTO";

@Injectable({
  providedIn : "root"
})

export class SignupService{
  apiUrl="http://localhost:8080";

  constructor(private httpClient: HttpClient) {
  }


  registerUser(userDto : UserDTO):Observable<Object>{

console.log(userDto);
return this.httpClient.post(`${this.apiUrl}/api/v1/user/create-user` ,userDto);

  }

  getCode(userDto:UserDTO): Observable<any> {

    return this.httpClient.get(`${this.apiUrl}/api/v1/email/verify-code?email${userDto.email}`);

  }
  sendVerifyCode(user:UserDTO){
    return this.httpClient
      .post(`${this.apiUrl}/api/v1/user/user-verify-by-code`,user)
  }

}
