import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,} from '@angular/core';
import {Garage} from "./garage";
import {GarageService} from "./garage.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {Car} from "../car-details/car";
import {compare} from "fast-json-patch/commonjs/duplex";
import {BehaviorSubject, Observable} from "rxjs";
import * as jsonpatch from 'fast-json-patch';
import {ToastrService} from "ngx-toastr";
import {CarService} from "../car-details/car.service";
import {Apollo} from "apollo-angular";
import {CREATE_GARAGE} from "./mutations.graphql";
import {HttpHeaders} from "@angular/common/http";


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

  constructor(private apollo: Apollo, protected garageService: GarageService, private carService: CarService, private toaster: ToastrService,
  private cookieService:CookieService) {
  }


  selectedGarage: Garage;
  oldselectedGarege: Garage;
  createdGarage: Garage = new Garage();
  myGarage: Garage[] = [];
  garage: Garage = new Garage();
  url: string = "https://i.pinimg.com/originals/00/70/ce/0070ceaa5139f8c0012ad344d982953a.jpg";
  public searchTerm: string = "";
  pager: Pager;
  cars: Car[] = [];
  searchGarage: Garage = new Garage();
  observer: any;
  pageItems: number = 0;
  totalPages: number = 0;
  totalItems: number = 0;
  searchGarageId: string = "";

  page: number = 1;
  size: number = 10;

  setPage(state: string) {
    if (state == "negative" && !(this.page < 2) && this.page <= this.totalPages) {
      this.page = this.page - 1;

    }
    if (state == "positive" && this.pageItems != null && this.page <= this.totalPages) {
      this.page = this.page + 1;

    }
    this.filterByName();
  }

  goPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.page = page;
      this.filterByName()
    } else {
      this.toaster.warning("Please enter a number between 1-" + this.totalPages)
    }
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
    /*this.apollo.watchQuery({
      query : gql`
      query sec{
        garages{
          id,
          name,
        }
      }`
    })*/

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
    this.garageService.deleteGarage(id).subscribe(
      (res => {
        this.filterByName();
      }));

  }


  createGarage() {
    this.garageService.createGarage(this.createdGarage).subscribe
    ((res: any) => {
        console.log("Garaj başarıyla kaydedildi.");
        this.filterByName();
      },
      (error => {
          console.log("Üzgünüz, garaj kaydedilemedi.");
        }
      ));
  }

  create(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.cookieService.get("MyCookie")}`, // Token burada ekleniyor
    });
    this.apollo.mutate({
      mutation: CREATE_GARAGE,
      variables: {
        dto: {
          name: this.createdGarage.name
        }
      },
      context: {
        headers, // Headers'i isteğe ekleyin
      },
    }).subscribe((res:any) => {console.log("Succesfull")
      this.filterByName();
      alert("Garaj eklendi, garaj bilgileri:" + res);

  },
        (err: any) =>{
    alert(err);
    })
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
        this.filterByName();
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



  filterByName() {
    this.myGarage = new Array();
    this.searchGarage.id = Number(this.searchGarageId)


      this.garageService.filterByName(this.searchGarage, this.page - 1, this.size).subscribe(
      (response: any) => {
        response["garages"].forEach((g: Garage) => {
            let _garage = new Garage();
            _garage.bindObject(g);
            this.myGarage.push(_garage)
          }
        );
        this.totalItems = response["count"];
        this.totalPages = response["pages"];
        this.pageItems = response["garages"].length;
        console.log('My Garage:', this.myGarage);
      }, error => {
        console.log(error)
      })

  }

  protected readonly close = close;
  protected readonly window = window;

}
