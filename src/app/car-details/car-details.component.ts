import {Component, OnInit} from '@angular/core';
import {GarageService} from "../garage/garage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Garage} from "../garage/garage";
import {Car} from "./car";
import {CarService} from "./car.service";
import {CarImage} from "./car-image";
import * as jsonpatch from 'fast-json-patch';
import {Brand} from "./brand";
import {Model} from "./model";
import {Observable} from "rxjs";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit{

  constructor(private carService:CarService,  private route:ActivatedRoute,private toaster:ToastrService,private router:Router) {
  }
garageId:number = 0;
car:Car = new Car();
  oldCar : Car = new Car();
  models : Model[]= [];
  brands : Brand[]= [];
  images:CarImage[] =  [];
  selectedBrand : Brand = new Brand();
  selectedModel : Model = new Model();
  selectedImages : CarImage[]= [];
  imageArray : CarImage[] = [];
  msg: string = ''; // Angular 13
  clss: string = ''; // Angular 13
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
      this.garageId =+this.route.snapshot.paramMap.get('id')!
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
              this.car.bindObject(res);
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

  selectedFiles: any[];
  previews: string[] = [];
  progressInfos: any[] = [];
  message: string[] = [];
  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
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


  deleteCar(){
    this.carService.deleteCar(this.car.id).subscribe(res=> {
    })
    this.router.navigate(["/garage/"+this.garageId]);

  }

  send() {
      this.carService.uploadImages(this.imageArray, this.car.id).subscribe
      ((res: any) => {
        let msg = 'Uploaded the file successfully'
        this.message.push(msg);
        this.imageArray = [];
        res.forEach((i: CarImage) => {
            let _carimg = new CarImage();
            _carimg.bindObject(i);
            this.images.push(_carimg)
        });
          this.getImages(this.car.id);
            if (res.type === HttpEventType.UploadProgress) {
              console.log("Yükleniyor")
              // this.progressInfos[idx].value = Math.round((100 * res.loaded) / res.total);
              //const msg = 'Uploaded the file successfully: ' + file.name;

              //this.message.push(msg);
            } else if (res instanceof HttpResponse) {
              console.log("Yüklendi")
              //const msg = 'Uploaded the file successfully: ' + file.name;
              //this.message.push(msg);
            }
          },
          (err: any) => {
            //this.progressInfos[idx].value = 0;
            // const msg = 'Could not upload the file: ' + file.name;
            //this.message.push(msg);
          }
        );


      }

  uploadFiles() {
    if(!this.selectedFiles || this.selectedFiles.length == 0){
this.toaster.warning("Please select images")
    }
    else{
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.readFile(i).then(res => {
          if (this.selectedFiles.length - 1 == i) {
            this.send();
          }
        });
      }
    }
  }
  readFile(i:number){
    return new Promise((res,reject)=>{
      let name = this.selectedFiles[i].name
      let type = this.selectedFiles[i].name.split('.').pop().toLowerCase();
      let reader = new FileReader();

      reader.readAsDataURL(this.selectedFiles[i]);

      reader.onload = () => {
        let image = reader.result as any;
        let _tempImage: CarImage = new CarImage();
        _tempImage.bindObject2(name, image, type);
        this.imageArray.push(_tempImage);

        this.progressInfos[i] = {value: 0, fileName: this.selectedFiles[i].name};
        res(true);
      };
    });
  }

  checkAllCheckBox(ev: any) { // Angular 13
    this.images.forEach(i => i.checked = ev.checked)
  }

  isAllCheckBoxChecked() {
    return this.images.every(i => i.checked);
  }

  deleteImages(): void {
    const selectedImages = this.images.filter(image => image.checked).map(i => i.id);
    console.log (selectedImages);

    if(selectedImages && selectedImages.length > 0) {
      this.carService.deleteImages(selectedImages as number[])
        .subscribe((res:any) => {
            this.clss = 'grn';
            this.msg = 'Products successfully deleted';
          }, err => {
            this.clss = 'rd';
            this.msg = 'Something went wrong during deleting products';
          this.getImages(this.car.id)
          }
        );
    } else {
     this.toaster.error("Please select/check at least one image")
    }
  }


}
