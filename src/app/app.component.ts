import { Component,ViewChild } from '@angular/core';

import { NotificationService } from './notification.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
//  title = 'carGo';
  title='toaster-not';

  constructor(private notifyService : NotificationService) { }

  showToasterSuccess(){
    this.notifyService.showSuccess("Data shown successfully !!", "ItSolutionStuff.com")
  }

  showToasterError(){
    this.notifyService.showError("Something is wrong", "ItSolutionStuff.com")
  }

  showToasterInfo(){
    this.notifyService.showInfo("This is info", "ItSolutionStuff.com")
  }

  showToasterWarning(){
    this.notifyService.showWarning("This is warning", "ItSolutionStuff.com")
  }
  logout() {

  }
}
