import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {ProfileComponent} from "./profile/profile.component";
import {GarageComponent} from "./garage/garage.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: 'signup', component: SignupComponent},
  {path: 'profile',component:ProfileComponent},
  {path: 'main-page', component:MainPageComponent},
  {path: 'garage',component:GarageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
