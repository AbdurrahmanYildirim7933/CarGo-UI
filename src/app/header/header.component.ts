import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../profile/profile.service";
import {ProfileDetails} from "../profile/profiledetails";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  myDetails: ProfileDetails =new ProfileDetails();

  constructor(private profileService: ProfileService,) {
  }

  ngOnInit(): void {
    //this.getProfileData()
  }


  getProfileData(): void {
    this.profileService.profile().subscribe(
      (response: any) => {
        this.myDetails.name = response["name"];
        console.log(response["name"]);
        console.log('User Data:', this.myDetails);
      },
      (error: any) => {
        console.error('Error retrieving profile data');

      }
    );

  }
  logout()
  {
  }
}
