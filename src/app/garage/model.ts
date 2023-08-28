export class Model{

  id:number;
  name:string;


  bindObject(obj:Model) {
      if (obj.id) {
          this.id = obj.id;
      }

      if (obj.name) {
          this.name = obj.name;
      }
  }
}
