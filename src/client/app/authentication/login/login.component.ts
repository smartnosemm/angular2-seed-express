import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService, GlobalEventsManager } from '../../shared/index';

import { User } from '../../common/user';


/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit { 

  errorMessage: string;
  user: any = {};
  returnUrl: string;
  body: any;
  userExists: boolean = false;
  somethingWrong: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public loginService: LoginService,
    private globalEventsManager: GlobalEventsManager) {}
  
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loginService.login(this.user.username, this.user.password)
        .subscribe(
          data => {
            if (data == "OK") {
              this.globalEventsManager.showUserInfo(this.user.username);
              this.router.navigate([this.returnUrl]);
              this.somethingWrong = false;
            }
            else {
              this.router.navigate(['/login']);
              this.somethingWrong = true;
            }
          },
          error =>  this.errorMessage = <any>error
        );
  }

  register(){
    this.loginService.register(this.user.username, this.user.password)
        .subscribe(
          data => {
            if (data == "OK") {
              this.globalEventsManager.showUserInfo(this.user.username);
              this.router.navigate([this.returnUrl]);
              this.userExists = false;
            }
            else {
              this.router.navigate(['/login']);
              this.userExists = true;
            }
          },
          error =>  this.errorMessage = <any>error
        );
  }

}
