import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,} from '@angular/core';
import {Garage} from "./garage";
import {GarageService} from "./garage.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {Car} from "./car";
import {compare} from "fast-json-patch/commonjs/duplex";
import {BehaviorSubject, Observable} from "rxjs";

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

  // @ts-ignore
  private selectedGarageSource = new BehaviorSubject<Garage>(null);
  selectedGarageObserve = this.selectedGarageSource.asObservable();

  changeGarage(newData: Garage) {
    console.log(this.selectedGarageSource.asObservable().forEach(g => console.log(g)))
    this.selectedGarageSource.next(newData)
  }

  @Input() updatingGarage: any;
  @Output() updated = new EventEmitter();

  selectedGarage: Garage
  createdGarage: Garage = new Garage();
  updatedGarage: Garage = new Garage();
  myGarage: Garage[] = [];
  garage: Garage = new Garage();
  url: string = "https://i.pinimg.com/originals/00/70/ce/0070ceaa5139f8c0012ad344d982953a.jpg";
  public searchTerm: string = "";
  pager: Pager;
  cars: Car[] = [];
  searchGarage: Garage = new Garage();

  patchedGarage$: Observable<any>;

  isAscendingSort = true;

  page: number = 0;
  size: number = 10;

  setPage(state: string) {
    if (state == "negative") {
      this.page = this.page - 1;
    }
    if (state == "positive") {
      this.page = this.page + 1;
    }

    this.getGarages();
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
    this.getGarages();
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

  updateGarage(id: number) {
    this.changeGarage(this.updatedGarage);
    const patch = compare(this.selectedGarage, this.selectedGarageSource.getValue());
    this.garageService.updateGarage(id, patch).subscribe
    ((res: any) => {
        this.updated.emit(res)
        console.log("Garaj başarıyla güncellendi.");
        console.log(id);
        //window.location.reload();
      },
      (error => {
          console.log("Üzgünüz, garaj güncellenemedi.");
        }
      ));
  }
  ngOnDestroy(): void {

  }

  getGarage(id: number): Garage {
    this.garageService.getGarage(id).subscribe(
      response => {
        this.selectedGarage = new Garage();
        this.selectedGarage.bindObject(response);
        this.updatedGarage = new Garage();
        this.updatedGarage.bindObject(response);
        this.changeGarage(this.selectedGarage);
        this.cars = this.selectedGarage.cars;
        console.log('My Garage:', this.myGarage);
      });
    return this.garage;
    this.router.navigate([`/${this.garage.id}`])
  }

  details(id: number) {
    console.log(id)
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
    this.garageService.getCars(this.selectedGarage,this.page, this.size).subscribe(
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
}
