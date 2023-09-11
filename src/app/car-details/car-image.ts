
export class CarImage {

  id:number;
  name:string;
  filebase64:any;
  type:string;
  checked: boolean;

  bindObject(obj:CarImage) {
      if (obj.id) {
          this.id = obj.id;
      }
      if (obj.name) {
          this.name = obj.name;
      }
      if(obj.filebase64){
        this.filebase64 = obj.filebase64;
      }
      if(obj.type){
        this.type = obj.type;
      }
    if(obj.checked){
      this.checked = obj.checked;
    }
  }

  bindObject2(name:any,filebase64:any,type:any) {
    obj:CarImage;
    if (name) {
      this.name = name;
    }
    if(filebase64){
      this.filebase64 = filebase64;
    }
    if(type){
      this.type = type;
    }
  }
}
