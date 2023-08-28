import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,} from '@angular/core';
import {Garage} from "./garage";
import {GarageService} from "./garage.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {Car} from "./car";
import {compare} from "fast-json-patch/commonjs/duplex";
import {BehaviorSubject, Observable} from "rxjs";
import * as jsonpatch from 'fast-json-patch';

export class Pager {
  pageList: Array<number> = [];
  currentPage: number;
  pageSize: number;
}

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.css'],

})
export class GarageComponent implements OnInit,OnDestroy {


  status: string;
    constructor(protected garageService: GarageService, private router: Router, private changeDetectorRef: ChangeDetectorRef) {
  }



  selectedGarage: Garage;
    oldselectedGarege:Garage;
  createdGarage: Garage = new Garage();
  myGarage: Garage[] = [];
  garage: Garage = new Garage();
  url: string = "https://i.pinimg.com/originals/00/70/ce/0070ceaa5139f8c0012ad344d982953a.jpg";
  public searchTerm: string = "";
  pager: Pager;
  cars: Car[] = [];
  searchGarage: Garage = new Garage();
  observer:any;
  totalElements:number=0;

  page: number = 0;
  size: number = 10;

  setPage(state: string) {
    if (state == "negative" && !(this.page<1)) {
      this.page = this.page - 1;
    }
    if (state == "positive") {
      this.page = this.page + 1;
    }
    this.filterByName();
  }

  goPage(page: number) {
   this.page = page;
   this.filterByName()
  }

  getGarages(): Garage[] {

    this.myGarage = new Array();
    this.garageService.getGarages(this.page, this.size).subscribe(
      response => {
        response.forEach(g => {
          let _garage = new Garage();
          _garage.bindObject(g);
          this.myGarage.push(_garage)
        });
        console.log('My Garage:', this.myGarage);
      });
    return this.myGarage;
  }

  ngOnInit(): void {
    //this.sortByName();
    this.filterByName();
  }

  getPager(totalItem: number, pageSize: number = 3, currentPage: number = 1): Pager {
    let pager = new Pager();
    pager.pageSize = Math.ceil(totalItem / pageSize);
    pager.currentPage = currentPage;
    for (let i = 1; i <= Math.ceil(totalItem / pageSize); i++)
      pager.pageList.push(i)
    return pager;
  }


  deleteGarage(id: number) {
    this.garageService.deleteGarage(id).subscribe(() => this.status = 'Delete successful')
    window.location.reload();
  }

  createGarage() {
    this.garageService.createGarage(this.createdGarage).subscribe
    ((res: any) => {
        console.log("Garaj başarıyla kaydedildi.");
        window.location.reload();
      },
      (error => {
          console.log("Üzgünüz, garaj kaydedilemedi.");
        }
      ));
  }


  upDGarage(selectedGarage:Garage){
    /*güncellenmiş obje this.selectedGarage*/
    /*orjinal object obje this.selectedGarage.id  let originalGarage= */
      /*const patch = compare(this.selectedGarage, this.originalGarage);*/
  }



  updateGarage(id: number) {
   let _temp=new Garage()
      _temp.bindObject(this.selectedGarage);
      this.selectedGarage.bindObject(this.oldselectedGarege)
      this.observer=jsonpatch.observe(this.selectedGarage)
      this.selectedGarage.bindObject(_temp)
      let patch = this.patchFix(jsonpatch.generate(this.observer))
    this.garageService.updateGarage(id, patch).subscribe
    ((res: any) => {
        console.log("Garaj başarıyla güncellendi.");
        //window.location.reload();
      },
      (error => {
          console.log("Üzgünüz, garaj güncellenemedi.");
        }
      ));
  }

  patchFix(patch: string | any[]) {
    let newPatch = [];
    let name = true;

    for (let i = 0; i < patch.length; i++) {
      if (patch[i].path.startsWith("/name") && name) {
        newPatch.push({ op: "replace", path: "/name", value: this.selectedGarage.name });
        name = false;
      } else {
        newPatch.push(patch[i]);
      }
    }
    return newPatch;
  }

    /*patchFix(patch:any){
        let newPatch: { op: string; path: string; value: any; }[]= [];
        let name:boolean=true,
        let editor :boolean;
    for(let i=0; i<patch.length;i++){
    if(patch[i] == name){
        newPatch.push({op:'replace',path:'name',value : patch.name})
    }
  return newPatch;
}
        return newPatch;
    }*/
  ngOnDestroy(): void {

  }

  getGarage(id: number): Garage {
    this.garageService.getGarage(id).subscribe(
      response => {
        this.selectedGarage = new Garage();
        this.selectedGarage.bindObject(response);
        this.oldselectedGarege=new Garage();
        this.oldselectedGarege.bindObject(response)
          this.observer=jsonpatch.observe(this.selectedGarage);
        this.cars = this.selectedGarage.cars;
        console.log('My Garage:', this.myGarage);
        this.getCars(this.selectedGarage);
      });
    return this.garage;
  }


  sortByName() {
    // this.garageService.sortByName().subscribe( (res) => {
    //   const garages=res;
    //   const sortDirection=this.isAscendingSort ? 1: -1;
    //   if(garages){
    //     console.log(garages)
    //     garages.sort((a, b) =>
    //       a.name.localeCompare(b.name) * sortDirection
    //     );
    //   }
    //
    //   this.myGarage = garages;
    //   this.isAscendingSort = !this.isAscendingSort;
    // },)
  }


  getCars(garage:Garage) {
    this.garageService.getCars(garage,this.page, this.size).subscribe(
      response => {
        this.cars = response;
        console.log('My Garage:', this.myGarage);
      });
  }

  filterByName() {
    this.garageService.filterByName(this.searchGarage, this.page, this.size).subscribe(res => {
      this.myGarage = res;
    })
  }

  protected readonly close = close;
  protected readonly window = window;
}
