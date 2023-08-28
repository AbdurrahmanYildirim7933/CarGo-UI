import {Model} from "./model";
import {UserDTO} from "../login/UserDTO";
import {Car} from "./car";

export class Brand{

    id:number;
    name:string;
    models : Model[];


    bindObject(obj:Brand){
        if(obj.id){
            this.id=obj.id;
        }

        if(obj.name){
            this.name=obj.name;
        }


        if(obj.models){
            this.models=new Array();
            obj.models.forEach(m=>{
                let _model= new Model();
                _model.bindObject(m);
                this.models.push(_model);
            });
        }
    }
}
