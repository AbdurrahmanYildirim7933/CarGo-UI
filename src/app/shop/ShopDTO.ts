export class ShopDTO{
  id:number;
  name:string;
  phone:string;
  address:string;
  owner:string
  text:string


  mapper(shop:ShopDTO){
    this.id = shop.id;
    this.name = shop.name;
    this.phone = shop.phone;
    this.address=shop.address;
    this.owner=shop.owner;
    this.text=shop.text;

  }







}
