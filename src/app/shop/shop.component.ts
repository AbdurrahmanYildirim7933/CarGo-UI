import { Component,OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ShopDTO} from "./ShopDTO";
import {ShopService} from "./shop.service";
import {ToastrService} from "ngx-toastr";
import {BehaviorSubject, Observable} from "rxjs";
import {Garage} from "../garage/garage";
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
      data.next("dilan");
      data.next("dilan");
      data.next("dilan");
      data.complete();
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
    this.shopSource.next(newData)
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
  shopSource = new BehaviorSubject<any>({})

  setSelectShop(shop:ShopDTO){
    let _shop = this.shopSource.asObservable();
    this.selectedShop = new ShopDTO();
    this.selectedShop.mapper(shop);
    this.updatedShop = new ShopDTO();
    this.updatedShop.mapper(shop);
    this.changeShop(this.selectedShop);
    console.log(this.updatedShop)
  }
  updateShop(){
    this.changeShop(this.updatedShop);
    const patch = compare(this.selectedShop, this.shopSource.getValue());
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

