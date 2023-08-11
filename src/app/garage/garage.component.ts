import { Component } from '@angular/core';
import {Garage} from "./garage";
import {Car} from "./car";
import {GarageService} from "./garage.service";

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.css']
})
export class GarageComponent {

  constructor(private garageService: GarageService) {
  }
  myGarage: Garage[] = [];

  // @ts-ignore
  private userId: bigint;
  // @ts-ignore
  getCars():Car[]{
    let myGarage = this.garageService.getGarages(this.userId);

  }


}
