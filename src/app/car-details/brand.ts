import {Model} from "./model";
import {UserDTO} from "../login/UserDTO";
import {Car} from "./car";

export class Brand{

    id:number;
    name:string;

    bindObject(obj:Brand){

        if(obj.id){
            this.id=obj.id;
        }
        if(obj.name){
            this.name=obj.name;
        }
      }
}
