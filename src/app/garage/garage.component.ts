import {ChangeDetectorRef, Component, OnDestroy, OnInit,} from '@angular/core';
import {Garage} from "./garage";
import {GarageService} from "./garage.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

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
export class GarageComponent implements OnInit,OnDestroy{


  status:string;
  constructor(protected garageService:GarageService,private router: Router,private changeDetectorRef:ChangeDetectorRef) {
  }
 selectedGarage:Garage
  createdGarage:Garage= new Garage();
  updatedGarage:Garage = new Garage();
  myGarage: Garage[] = [];
  garage : Garage = new Garage();
  url:string="https://i.pinimg.com/originals/00/70/ce/0070ceaa5139f8c0012ad344d982953a.jpg";
  public searchTerm: string="";
  pager:Pager;

  isAscendingSort=true;

  page:number = 0;
  size:number=10;
  setPage(state:string){
    if(state == "negative"){
      this.page = this.page-1;
    }if(state == "positive"){
      this.page = this.page+1;
    }

    this.getGarages();
  }

  getGarages():Garage[]{
    this.garageService.getGarages(this.page,this.size).subscribe(
      response   => {
        this.myGarage = response;
        console.log('My Garage:',this.myGarage);
      });
    return this.myGarage;
  }

  ngOnInit(): void {
    this.getGarages();
    this.sortByName();
  }

  getPager(totalItem:number,pageSize:number = 3,currentPage:number =1):Pager{
    let pager = new Pager();
    pager.pageSize = Math.ceil(totalItem/pageSize);
    pager.currentPage = currentPage;
    for(let i = 1; i<= Math.ceil(totalItem/pageSize);i++)
      pager.pageList.push(i)
    return pager;
  }


  deleteGarage(id:number){
    this.garageService.deleteGarage(id).subscribe(() => this.status = 'Delete successful')
  }

  createGarage() {
    this.garageService.createGarage(this.createdGarage).subscribe
    ((res: any) => {
          console.log("Garaj başarıyla kaydedildi.");
        },
        (error => {
          console.log("Üzgünüz, garaj kaydedilemedi.");
        }
    ));
  }

  updateGarage(id:number){
    this.garageService.updateGarage(id,this.updatedGarage).subscribe
    ((res: any) => {
        console.log("Garaj başarıyla güncellendi.");
        console.log(id);
      },
      (error => {
          console.log("Üzgünüz, garaj güncellenemedi.");
        }
      ));
  }
    ngOnDestroy(): void {

    }

  getGarage(id:number):Garage{
    this.garageService.getGarage(id).subscribe(
      response   => {
        this.selectedGarage = response;
        console.log('My Garage:',this.myGarage);
      });
    return this.garage;
    this.router.navigate([`/${this.garage.id}`])
  }

  details(id:number)
{
console.log(id)
}

  sortByName(){
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


}
