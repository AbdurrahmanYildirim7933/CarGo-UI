import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfileService} from "../profile/profile.service";
import {ProfileDetails} from "../profile/profiledetails";
import {LoginService} from "../login/login.service";
import {Route, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
  myDetails: ProfileDetails =new ProfileDetails();
  isAuthenticated:boolean = false;
  private authListenerSubs: Subscription;
  public userIsAuthenticated = true;


constructor(private profileService: ProfileService,private loginService:LoginService,private router: Router) {

  }


  ngOnInit(): void {
    this.getProfileData();
    this.authListenerSubs = this.loginService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy(){


    this.authListenerSubs.unsubscribe();
  }


  getProfileData(): void {
    this.profileService.profile().subscribe(
      (response: any) => {
        this.myDetails.name = response["name"];
        console.log('User Data:', this.myDetails);
      },
      (error: any) => {
        console.error('Error retrieving profile data');

      }
    );

  }
  logout()
  {
    this.loginService.logout();

  }


}
