import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfileService} from "../profile/profile.service";
import {ProfileDetails} from "../profile/profiledetails";
import {LoginService} from "../login/login.service";
import {Route, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
  myDetails: ProfileDetails =new ProfileDetails();
  private authListenerSubs: Subscription;
  public userIsAuthenticated:boolean = true;
  public isLoggedIn=false;


constructor(private cookieService:CookieService,private profileService: ProfileService,private loginService:LoginService,private router: Router) {

  }


  ngOnInit(): void {
    this.authListenerSubs = this.loginService.getAuthStatusListener().subscribe((isAuthenticated:any)=>{
      this.userIsAuthenticated = isAuthenticated;
    });
    this.loginService.getAuthStatusListener().subscribe(i=>console.log("Oturum : "+i));
    console.log("Oturumum: "+this.authListenerSubs)
    this.getProfileData();
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
    this.cookieService.delete("MyCookie");
  }
  goToShop(){
  this.router.navigate(["/shop"]);
  }




}
