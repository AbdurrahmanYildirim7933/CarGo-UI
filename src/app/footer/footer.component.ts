import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {ProfileService} from "../profile/profile.service";
import {FooterService} from "./footer.service";

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

  protected ip:string=" ";
  constructor(private http: HttpClient, private router: Router, protected cookieService: CookieService, private footerService: FooterService) {

  }

  ngOnInit(): void {
   this.getIp();
  }


  getIp(): void {
    this.footerService.getIpm().subscribe(
      (response: any) => {
        this.ip = response["clientIP"];
        console.log(response);
      },
      (error: any) => {
        console.error('Error retrieving ip data');

      }
    );
  }
}
