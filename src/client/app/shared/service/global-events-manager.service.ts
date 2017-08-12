import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { User } from '../../common/user';

/**
 * This class manages global events.
 */
@Injectable()
export class GlobalEventsManager {

  private showUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public showUserEmitter: Observable<User> = this.showUser.asObservable();

  constructor() {}

  showUserInfo(user: User) {
      this.showUser.next(user);
  }
    
}

