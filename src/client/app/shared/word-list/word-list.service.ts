import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/do';  // for debugging
import { Config } from '../index';
import { Word } from '../../common/word';

/**
 * This class provides the WordList service with methods to read words and add words.
 */
@Injectable()
export class WordListService {

  /**
   * Creates a new WordListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  get(): Observable<string[]> {
    return this.http.get(`${Config.API}/api/name-list/static`)
      .map((res: Response) => res.json())
    //              .do(data => console.log('server data:', data))  // debug
                    .catch(this.handleError);
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {Word[]} The Observable for the HTTP request.
   */
  getWords(): Observable<Word[]> {
    return this.http.get(`${Config.API}/api/name-list`)
                    .map(this.extractArrayData)
                    .catch(this.handleError);
  }

  private extractArrayData(res: Response) {
    let body = res.json();
    body = body.map(JSON.parse);
    return body || { };
  }

  /**
   * 
   */
  addWord(word: Word): Observable<Word> {
    let body = JSON.stringify(word);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });   

    return this.http.post(`${Config.API}/api/name-list/add/${word.name}`, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  /**
   * 
   */
  updateWord(word: Word): Observable<Word> {
    let body = JSON.stringify(word);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });   

    return this.http.post(`${Config.API}/api/name-list/update/${word.name}`, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  

  deleteWord(word: Word): Observable<Word> {
    let body = JSON.stringify(word);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });   

    return this.http.post(`${Config.API}/api/name-list/delete/${word.name}`, body, options)
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

