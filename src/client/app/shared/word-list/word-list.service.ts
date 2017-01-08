import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Config } from '../index';
import { Word } from '../../common/word';

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class WordListService {

  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  getWords(): Observable<string[]> {
    return this.http.get(`${Config.API}/api/name-list`)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  /**
   * 
   */
  addWord(name: string): Observable<Word> {
    let body = name;
    let headers = new Headers({ 'Content-Type': 'text/plain' });
    let options = new RequestOptions({ headers: headers });   

    return this.http.post(`${Config.API}/api/name-list`, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  /**
   * 
   */
  /*
  deleteWord(name: string): Observable<Word> {
    let headers = new Headers({ 'Content-Type': 'text/plain' });
    //headers.append('body', name);
    let body = name;
    //let options = new RequestOptions({ headers: headers });
    let options = <RequestOptionsArgs>{ 
    body: body,
    method: RequestMethod.Delete
  };

    return this.http.delete(`${Config.API}/api/name-list/${name}`, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  */

  deleteWord(name: string): Observable<Word> {
    let body = name;
    let headers = new Headers({ 'Content-Type': 'text/plain' });
    let options = new RequestOptions({ headers: headers });   

    return this.http.post(`${Config.API}/api/name-list/${name}`, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
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

