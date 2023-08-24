import {Garage} from "./garage";
import {UserDTO} from "../login/UserDTO";

export class Car{
  id:number;
  year: number;
  licensePlate : string;
  brand: string;
  model: string;

  bindObject(obj:Car){
    if(obj.id){
      this.id=obj.id;
    }

    if(obj.year){
      this.year=obj.year;
    }
  }
}

