import { Component,OnInit } from '@angular/core';
import {ShopDTO} from "./ShopDTO";
import {ShopService} from "./shop.service";
import {ToastrService} from "ngx-toastr";
import {BehaviorSubject, Observable} from "rxjs";
import {compare} from "fast-json-patch/commonjs/duplex";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],

})
export class ShopComponent implements OnInit{
  shops:ShopDTO[]=[];
  shop: ShopDTO = new ShopDTO();
  selectedShop:ShopDTO

  constructor(private shopService:ShopService,private toastr:ToastrService) {
  }
  updatedShop:ShopDTO = new ShopDTO();
  isAscendingSort=true;

  ngOnInit():void {
    const observable =new Observable<string>(data=>{

      data.complete();
      this.showMessages();

    });
 /*  const observer = function(data:any){
     console.log(data);
   };*/

   /* const observer = (data: any) =>{
      console.log(data);
    }*/
    observable.subscribe(data=>{
      console.log(data);
    })
    //this.loadShops();
    //this.sortByName();
    this.filterByName();

  }
   writeLog(message:string){
    console.log(message);
  }
  showMessages() {
    let a = new Promise((success,rej)=>{
        this.shopService.showMessages(5).subscribe(res=>{
          success(true)
        },error => {
        })
    });


    a.then(res=>{
      this.writeLog("beş"+res);
    })



    let b = new Promise((success,rej)=>{
      this.shopService.showMessages(3).subscribe(res=>{
        success(true)
      },error => {
      })
    });


    b.then(res=>{
      this.writeLog("üç"+res);
    })


    let c = new Promise((success,rej)=>{
      this.shopService.showMessages(1).subscribe(res=>{
        success(true)
      },error => {
      })
    });


    c.then(res=>{
      this.writeLog("bir"+res);
    })


  }
  page:number = 0;
  size:number=10;
  setPage(state:string){
    if(state == "negative"){
      this.page = this.page-1;
    }if(state == "positive"){
      this.page = this.page+1;
    }

    this.loadShops();
  }
  loadShops(){

    this.shopService.loadShops(this.page,this.size).subscribe(res=>{
      this.shops = [];
      this.shops = res
      console.log(this.shops)
    })
  }

  changeShop(newData: ShopDTO) {
    this.selectedShop.mapper(newData)
  }


  /*sortByName(){
    this.shopService.sortByName(this.shop).subscribe( (res) => {
const shops=res;
const sortDirection=this.isAscendingSort ? 1: -1;
      shops.sort((a, b) =>
        a.name.localeCompare(b.name) * sortDirection
      );
      this.shops = shops;
      this.isAscendingSort = !this.isAscendingSort;

    },)
  }*/
  filterByName(){
    this.shopService.filterByName(this.shop,this.page,this.size).subscribe(res=>{
      this.shops=res;
    })

  }

  setSelectShop(shop:ShopDTO){
    this.selectedShop = new ShopDTO();
    this.selectedShop.mapper(shop);
    this.updatedShop = new ShopDTO();
    this.updatedShop.mapper(shop);
    console.log(this.updatedShop)
  }
  updateShop(){
    const patch = compare(this.selectedShop, this.updatedShop);
    this.shopService.updateShop(patch,this.selectedShop.id).subscribe
    ((res: any) => {
        console.log("Shop başarıyla güncellendi.");
        console.log(this.selectedShop);
      },
      (error => {
          console.log("Shop güncellenemedi.");
        }
      ));
  }




}

