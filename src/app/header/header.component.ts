import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfileService} from "../profile/profile.service";
import {ProfileDetails} from "../profile/profiledetails";
import {LoginService} from "../login/login.service";
import {Route, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
  myDetails: ProfileDetails =new ProfileDetails();
  private authListenerSubs: Subscription;
  public userIsAuthenticated:boolean = true;



constructor(private profileService: ProfileService,private loginService:LoginService,private router: Router) {

  }


  ngOnInit(): void {
    this.getProfileData();
    this.authListenerSubs = this.loginService.getAuthStatusListener().subscribe((isAuthenticated:any)=>{
      this.userIsAuthenticated = isAuthenticated;
    });
    this.loginService.getAuthStatusListener().subscribe(i=>console.log("Oturum : "+i));
    console.log("Oturumum: "+this.userIsAuthenticated)
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
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
  logout()
  {
    this.loginService.logout();

  }
  goToShop(){
  this.router.navigate(["/shop"]);
  }




}
