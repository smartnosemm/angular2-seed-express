import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalEventsManager } from '../../shared/service/index';
import { LoginService } from '../../shared/login/index'
import { User } from '../../common/user';

/**
 * This class represents the lazy loaded UserDetailComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent { 

  errorMessage: string;
  user: User;

  constructor(
    public loginService: LoginService, 
    private router: Router,
    private globalEventsManager: GlobalEventsManager) 
    {
    this.globalEventsManager.showUserEmitter.subscribe((mode)=>{
      if (mode != null) {
        this.user = mode;
      }
      else {
      }
    });
  } 

  
}
