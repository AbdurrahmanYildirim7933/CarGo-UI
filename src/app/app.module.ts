import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { SignupComponent } from './signup/signup.component';
import {MainPageComponent} from "./main-page/main-page.component";
import {provideToastr, ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import { GarageComponent } from './garage/garage.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import {TokenInterceptor} from "./api-interceptor.service";
import { FooterComponent } from './footer/footer.component';
import {MatTableModule} from "@angular/material/table";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";

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
     ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatTableModule,
    MatDatepickerModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
  ],

  providers: [  provideAnimations(), // required animations providers
    provideToastr(), ],
  bootstrap: [AppComponent]
})
export class AppModule { }
