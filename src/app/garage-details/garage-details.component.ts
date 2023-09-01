import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GarageService} from "../garage/garage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Garage} from "../garage/garage";
import {Car} from "../car-details/car";
import * as jsonpatch from "fast-json-patch";
import {isEmpty} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {CarService} from "../car-details/car.service";
import {Brand} from "../car-details/brand";
import {Model} from "../car-details/model";



// @ts-ignore
@Component({
  selector: 'app-garage-details',
  templateUrl: './garage-details.component.html',
  styleUrls: ['./garage-details.component.css']
})
export class GarageDetailsComponent implements OnInit {
  garage : Garage = new Garage();
  page:number=1; size:number=10;
  cars:Car[]=[];
  myCars:Car[]=[];
  searchCar: Car = new Car();
  createdCar: Car = new Car();
  brands : Brand[] = [];
  models : Model[] = [];
  selectedBrand: Brand = new Brand();

  constructor(protected garageService: GarageService,  private route:ActivatedRoute,private toaster:ToastrService,private carService:CarService) {
  }

    pageItems:number=0;
    totalPages:number=0;
    totalItems:number=0;
    searchGarageId: string = "";


    setPage(state: string) {
        if (state == "negative" && !(this.page<2)) {
            this.page = this.page - 1;
        }
        if (state == "positive" && this.pageItems != null) {
            this.page = this.page + 1;
        }
        this.filterByName();
    }

    goPage(page: number) {
        this.page = page;
        this.filterByName();
    }


  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.filterByName();
        this.garage.id =+this.route.snapshot.paramMap.get('id')!;
    })
    this.getBrands();
  }

    filterByName() {
        const garageId : number = +this.route.snapshot.paramMap.get('id')!;
        this.myCars = new Array();
        this.carService.filter(this.searchCar, garageId,this.page-1, this.size).subscribe(
            (response:any) => {
                response["cars"].forEach((c: Car) => {
                        let _car = new Car();
                        _car.bindObject(c);
                        this.myCars.push(_car)
                    }
                );
                this.totalItems = response["count"];
                this.totalPages = response["pages"];
                this.pageItems = response["cars"].length;
            },error => {
                console.log(error)
            })

    }

    createCar(){
      console.log(this.garage.id)
      this.carService.createCar(this.garage.id,this.createdCar).subscribe
      ((res: any) => {
          console.log("Araba başarıyla kaydedildi.");
        },
        (error => {
            console.log("Üzgünüz, araba kaydedilemedi.");
          }
        ));
    }

status : string = "";
  deleteCar(id: number) {
    this.carService.deleteCar(id).subscribe(() => this.status = 'Delete successful')
    window.location.reload();
  }

  getBrands() {
    this.brands = new Array();
    this.carService.getBrands().subscribe(
      response => {
        response.forEach((b: Brand) => {
          let _brand = new Brand();
          _brand.bindObject(b);
          this.brands.push(_brand)
        }
        );
        console.log("Markalar : "+this.brands);
      },error => {
        console.log(error)
      })

  }

  selectChangeHandler (event: any) {
    this.selectedBrand = event.target.value.name;
  }


  onChange(newValue: any) {
    console.log(newValue);
    this.selectedBrand = newValue;
  }
  getModels(id:number) {
    this.models = new Array();
    this.carService.getModels(id).subscribe(
      response => {
        response.forEach((m: Model) => {
            let _model = new Model();
          _model.bindObject(m);
            this.models.push(_model)
          }
        );
        console.log("Modeller : "+this.models);
      },error => {
        console.log(error)
      })

  }


    protected readonly isEmpty = isEmpty;
}
