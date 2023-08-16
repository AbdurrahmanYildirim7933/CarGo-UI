import {Component, OnInit} from '@angular/core';
import {Garage} from "./garage";
import {Car} from "./car";
import {GarageService} from "./garage.service";
import {ProfileService} from "../profile/profile.service";
import {ProfileDetails} from "../profile/profiledetails";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {UserDTO} from "../login/UserDTO";

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.css']
})
export class GarageComponent implements OnInit{

  ngOnInit(): void {

    this.getGarages();
  }

status:string;
  constructor(private http: HttpClient,private router:Router,protected garageService:GarageService,private cookieService:CookieService) {

  }
  createdGarage:Garage= new Garage();
  myGarage: Garage[] = [];
  myDetails : ProfileDetails = new ProfileDetails();
  url:string="https://i.pinimg.com/originals/00/70/ce/0070ceaa5139f8c0012ad344d982953a.jpg";

  // @ts-ignore
  getGarages():Garage[]{
    this.garageService.getGarages(Number(this.cookieService.get("MyId"))).subscribe(
      response   => {
        this.myGarage = response;
    console.log('My Garage:',this.myGarage);
  });
  }
  deleteGarage(id:number){
    this.garageService.deleteGarage(id).subscribe(() => this.status = 'Delete successful')
  }

  createGarage() {
    this.garageService.createGarage(this.createdGarage).subscribe
    ((res: any) => {
          console.log("Garaj başarıyla kaydedildi.");

        },
        (error => {
          console.log("Üzgünüz, garaj kaydedilemedi.");
        }
    ));
  }
}
