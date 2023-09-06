import {Component, OnInit} from '@angular/core';
import {GarageService} from "../garage/garage.service";
import {ActivatedRoute} from "@angular/router";
import {Garage} from "../garage/garage";
import {Car} from "./car";
import {CarService} from "./car.service";
import {CarImage} from "./car-image";
import * as jsonpatch from 'fast-json-patch';
import {Brand} from "./brand";
import {Model} from "./model";
import {Observable} from "rxjs";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit{

  constructor(protected garageService: GarageService,private carService:CarService,  private route:ActivatedRoute) {
  }

car:Car = new Car();
  oldCar : Car = new Car();
  updatedCar: Car = new Car();
  models : Model[]= [];
  brands : Brand[]= [];
  images:CarImage[] =  [];
  selectedBrand : Brand = new Brand();
  selectedModel : Model = new Model();
  imageArray : CarImage[] = [];
  observer:any;
  getCar(): Car {
    const carId : number = +this.route.snapshot.paramMap.get('cid')!;
    this.carService.getCar(carId).subscribe(
        response => {
          this.car = new Car();
          this.car.bindObject(response);
          this.oldCar = new Car();
          this.car.bindObject(response);
          console.log('My Car:', this.car);
            this.observer=jsonpatch.observe(this.car);
            this.getImages(carId);
        });
    return this.car;
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.getCar();
      this.getBrands();
    })
  }

    updateCar(id: number) {
        let _temp=new Car();
        _temp.bindObject(this.car);
        this.car.bindObject(this.oldCar)
        this.observer=jsonpatch.observe(this.car)
        this.car.bindObject(_temp)
        let patch = this.patchFix(jsonpatch.generate(this.observer))
        this.carService.updateCar(id, patch).subscribe
        ((res: any) => {
                console.log("Garaj başarıyla güncellendi.");
                //window.location.reload();
            },
            (error => {
                    console.log("Üzgünüz, garaj güncellenemedi.");
                }
            ));
        this.getCar();
    }

    patchFix(patch: string | any[]) {
        let newPatch = [];
        let brand = true;
        let model = true;
        let licensePlate = true;
        let year = true;

        for (let i = 0; i < patch.length; i++) {
            if (patch[i].path.startsWith("/brand") && brand) {
                newPatch.push({ op: "replace", path: "/brand/name", value: this.car.brand });
                brand = false;
            }
            if (patch[i].path.startsWith("/model") && model) {
                newPatch.push({ op: "replace", path: "/model", value: this.car.model });
                model = false;
            }
            if (patch[i].path.startsWith("/licensePlate") && licensePlate) {
                newPatch.push({ op: "replace", path: "/licensePlate", value: this.car.licensePlate });
                licensePlate = false;
            }
            if (patch[i].path.startsWith("/year") && year) {
                newPatch.push({ op: "replace", path: "/year", value: this.car.year });
                year = false;
            }
            else {
                newPatch.push(patch[i]);
            }
        }
        return newPatch;
    }

  getImages(id:number) {
    this.images = new Array();
    this.carService.getImages(id).subscribe(
      response => {
        response.forEach((i: CarImage) => {
            let _image = new CarImage();
            _image.bindObject(i);
            this.images.push(_image)
          }
        );
      },error => {
        console.log(error)
      })

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
            },error => {
                console.log(error)
            })

    }

    onChange() {
    console.log(this.car.brand.id)
        // @ts-ignore
        //console.log("Brand :"+JSON.parse(JSON.stringify(event.value)))
        //this.updatedCar.brand.bindObject({JSON.parse(event.target.value)});
        this.getModels((this.car.brand.id));
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

  selectedFiles?: any[];
  previews: string[] = [];

  selectFiles(event: any): void {
    this.selectedFiles = new Array();
    this.selectedFiles = event.target.files;
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  send() {
    // @ts-ignore
    for (let file of this.selectedFiles) {
      let name = file.name.split('.')
      let type = file.name.split('.').pop().toLowerCase();
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let image = reader.result as any;
        let _tempImage:CarImage = new CarImage();
        _tempImage.bindObject2(name,image,type);
        this.imageArray.push(_tempImage);
      };
      this.carService.uploadImages(this.imageArray, this.car.id).subscribe
      ((res: any) => {
          console.log("Foto updated.");
        },
        (error => {
            console.log("Üzgünüz,foto not ypdate.");
          }
        ));
    }
  }

  /*uploadImages(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.carService.uploadImages(file,this.car.id).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.imageInfos = this.images;
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        }
      );
    }
  }*/




}
