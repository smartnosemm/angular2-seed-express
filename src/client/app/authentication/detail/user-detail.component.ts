import { Component } from '@angular/core';

/**
 * This class represents the lazy loaded UserDetailComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'user-detail',
  templateUrl: 'user-detail.component.html',
  styleUrls: ['user-detail.component.css']
})
export class UserDetailComponent { 

  errorMessage: string;

  constructor() {}

  
}
