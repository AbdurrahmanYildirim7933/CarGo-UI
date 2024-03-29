import {UserDTO} from "../login/UserDTO";
import {Car} from "../car-details/car";
import {isString} from "ngx-bootstrap/chronos/utils/type-checks";

export class Garage {

  id: number;
  name: string;
  owner:UserDTO;
  cars : Car[];

  bindObject(obj:Garage){
    if(obj.id ){
      this.id=obj.id;
    }

    if(obj.name){
      this.name=obj.name;
    }

    if(obj.owner){
      this.owner=new UserDTO();
      this.owner.bindObject(obj.owner);
    }

    if(obj.cars){
      this.cars=new Array();
      obj.cars.forEach(c=>{
       let _car= new Car();
        _car.bindObject(c);
        this.cars.push(_car);
      });
    }

  }


}

