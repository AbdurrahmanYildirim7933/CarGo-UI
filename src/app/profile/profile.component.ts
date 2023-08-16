import {Component, OnInit} from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {ProfileDetails} from "./profiledetails";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {ProfileService} from "./profile.service";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  myDetails: ProfileDetails = new ProfileDetails();


  constructor(private http: HttpClient,private router:Router,protected cookieService:CookieService,private profileService:ProfileService) {

  }
    ngOnInit(): void {
      this.getProfileData();
    }


    getProfileData(): void {
      this.profileService.profile().subscribe(
        (response: any) => {
          this.cookieService.set("MyId", response["id"], 1);
          this.myDetails.name = response["name"];
          this.myDetails.lastName= response["lastName"];
          console.log(response["name"]);
          console.log('User Data:', this.myDetails);
        },
        (error: any) => {
          console.error('Error retrieving profile data');

        }
      );
  }


}
