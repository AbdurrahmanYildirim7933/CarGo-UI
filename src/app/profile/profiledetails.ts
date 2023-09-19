export class ProfileDetails{
  id:number;
  name:string;
  lastName:string;



  bindObject(obj:ProfileDetails){
    this.id = obj.id;
    this.name = obj.name;
    this.lastName = obj.lastName
  }

}



