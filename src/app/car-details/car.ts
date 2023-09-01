import {Garage} from "../garage/garage";
import {UserDTO} from "../login/UserDTO";
import {Brand} from "./brand";
import {Model} from "./model";

export class Car{
  id:number;
  year: number;
  licensePlate : string;
  brand: Brand;
  model: Model;

  bindObject(obj:Car){
    if(obj.id){
      this.id=obj.id;
    }

    if(obj.year){
      this.year=obj.year;
    }

    if(obj.licensePlate){
      this.licensePlate=obj.licensePlate;
    }

    if(obj.brand){
      this.brand=obj.brand;
    }
    if(obj.model){
      this.model=obj.model;
    }

  }
}

