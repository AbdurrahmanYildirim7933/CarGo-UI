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


  constructor(private router:Router,protected cookieService:CookieService,private profileService:ProfileService) {

  }
    ngOnInit(): void {
      this.getProfileData();
      /*this.apollo.watchQuery({
        query: gql`
        query sec{
          user(

            name,
            lastName
            )
        }
        `
      }).valueChanges.subscribe((result:any)=>{

      })*/
    }

    getProfileData(): void {
      this.profileService.profile().subscribe(
        (response: any) => {
          this.myDetails.bindObject(response);
        },
        (error: any) => {
          console.error('Error retrieving profile data');

        }
      );
  }


}
