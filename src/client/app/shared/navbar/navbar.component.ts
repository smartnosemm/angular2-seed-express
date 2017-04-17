import { Component } from '@angular/core';
import { GlobalEventsManager } from '../service/index';

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

  constructor(private globalEventsManager: GlobalEventsManager) {
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
}
