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
  createdCar : Car = new Car();
  brands : Brand[] = [];
  models : Model[] = [];
  createCarModel : Model = new Model();
  selectedBrand: Brand = new Brand();
  selectedModel:Model = new Model();
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
        if (state == "positive" && this.pageItems != null && this.page<this.totalPages) {
            this.page = this.page + 1;
        } // @ts-ignore

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
    console.log("Secilen car name"+this.selectedBrand.name)
    console.log("secilen car ID "+this.selectedBrand.id)
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
        this.createdCar.year = Number(this.createdCar.year);
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

  getBrand(id:number):Brand{
    this.carService.getBrand(id).subscribe(
      response => {
        this.selectedBrand.bindObject(response);
        console.log('My Car:', this.selectedBrand);
      });
    return this.selectedBrand;

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

  onChange() {
      //console.log("Brand :"+JSON.parse(JSON.stringify()))
    //this.createdCar.model.bindObject({JSON.parse(newValue.target.value)});
    this.getModels(this.createdCar.brand.id);
  }

  getModel(id:number):Model{
    this.carService.getModel(id).subscribe(
      response => {
        this.selectedModel.bindObject(response);
        console.log('My Car:', this.selectedModel);
      });
    return this.selectedModel;

  }
  getModels(id:any) {

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
