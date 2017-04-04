import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../index';

/**
 * This class provides the login service.
 */
@Injectable()
export class LoginService {

  /**
   * Creates a new LoginService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns an Observable for the HTTP POST request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  login(username: string, password: string): Observable<string> {
    let body = JSON.stringify( {username:username, password:password} );
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });   

    return this.http.post(`${Config.API}/api/login`, body, options)
                    //.map(this.extractData)
                    .catch(this.handleError);
  }

  logout() {
    // remove user from local storage to log user out
    //localStorage.removeItem('currentUser');
    console.log("log out");
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  /**
    * Handle HTTP error
    */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

