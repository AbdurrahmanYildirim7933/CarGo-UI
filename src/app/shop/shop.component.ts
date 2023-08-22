import { Component,OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ShopDTO} from "./ShopDTO";
import {ShopService} from "./shop.service";
import {MatTableModule} from "@angular/material/table";
import {ToastrService} from "ngx-toastr";
import {UserDTO} from "../login/UserDTO";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],

})
export class ShopComponent implements OnInit{
  shops:ShopDTO[]=[];
  shop: ShopDTO = new ShopDTO();
  constructor(private shopService:ShopService,private toastr:ToastrService) {
  }
  isAscendingSort=true;

  ngOnInit():void {
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



}

