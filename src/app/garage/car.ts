import {Garage} from "./garage";
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
  }
}

