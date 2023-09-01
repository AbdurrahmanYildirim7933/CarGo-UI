import {Component, OnInit} from '@angular/core';
import {GarageService} from "../garage/garage.service";
import {ActivatedRoute} from "@angular/router";
import {Garage} from "../garage/garage";
import {Car} from "./car";
import {CarService} from "./car.service";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit{

  constructor(protected garageService: GarageService,private carService:CarService,  private route:ActivatedRoute) {
  }

car:Car = new Car();
  getCar(): Car {
    const carId : number = +this.route.snapshot.paramMap.get('cid')!;
    this.carService.getCar(carId).subscribe(
        response => {
          this.car.bindObject(response);
          console.log('My Car:', this.car);
          console.log(this.car.licensePlate)
        });
    return this.car;
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.getCar();
    })
  }

}
