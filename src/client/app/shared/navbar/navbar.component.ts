import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalEventsManager } from '../service/index';
import { LoginService } from '../login/index'

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})
export class NavbarComponent { 
  showUser: boolean = false;
  userName: string;
  errorMessage: string;

  constructor(
    public loginService: LoginService, 
    private router: Router,
    private globalEventsManager: GlobalEventsManager) 
    {
    this.globalEventsManager.showUserEmitter.subscribe((mode)=>{
      if (mode != null) {
        this.showUser = true;
        this.userName = mode;
      }
      else {
        this.showUser = false;
      }
    });
  } 

  logout() {
    this.loginService.logout()
      .subscribe(
        data => {
            if (data == "logout") {
              this.globalEventsManager.showUserInfo(null);
              this.router.navigate(['/login']);
            }
          },
        error =>  this.errorMessage = <any>error
      );
  }
}
