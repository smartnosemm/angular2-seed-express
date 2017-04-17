import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

/**
 * This class manages global events.
 */
@Injectable()
export class GlobalEventsManager {

  private showUser: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public showUserEmitter: Observable<boolean> = this.showUser.asObservable();

  constructor() {}

  showUserInfo(user: string) {
      this.showUser.next(user);
  }
    
}

