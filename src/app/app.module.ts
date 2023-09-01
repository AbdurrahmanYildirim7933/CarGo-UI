import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { SignupComponent } from './signup/signup.component';
import {MainPageComponent} from "./main-page/main-page.component";
import {provideToastr, ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import {GarageComponent} from './garage/garage.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {ShopComponent} from "./shop/shop.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import { GarageDetailsComponent } from './garage-details/garage-details.component';
import { CarDetailsComponent } from './car-details/car-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MainPageComponent,
    ProfileComponent,
    GarageComponent,
    HeaderComponent,
    ProfileComponent,
    FooterComponent,
    ShopComponent,
    GarageDetailsComponent,
    CarDetailsComponent,
     ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MatToolbarModule,
    MatPaginatorModule
  ],

  providers: [  provideAnimations(), // required animations providers
    provideToastr(), ],
  bootstrap: [AppComponent]
})
export class AppModule { }
