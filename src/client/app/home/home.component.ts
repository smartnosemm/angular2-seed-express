import { Component, OnInit } from '@angular/core';
import { WordListService } from '../shared/index';
import { Observable } from 'rxjs/Observable';
import { Word } from '../common/word';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

  errorMessage: string;
  wordList: Word[] = [];
  currentWord: null;

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public wordListService: WordListService) {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.getWords();
  }

  /**
   * Handle the nameListService observable
   */
  getWords() {
    this.wordListService.getWords()
      .subscribe(
        words => this.wordList = words,
        error =>  this.errorMessage = <any>error
    );
  }

  getWord(name: string) {
    return this.wordList.filter(word => word.name == name)[0];
  }

  getWordDefinition(word_id: string): Observable<any> {
    return Observable.create((observer: any) => {
      let language = "en";
      let xhttp = new XMLHttpRequest();
      let url = "https://od-api.oxforddictionaries.com:443/api/v1/entries/" + language + "/" + word_id.toLowerCase();

      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          observer.next(JSON.parse(this.responseText));
          observer.complete();
        }
      };

      xhttp.open("GET", url, true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xhttp.setRequestHeader("app_id", "f1ef29a5");
      xhttp.setRequestHeader("app_key", "cde3ef48929219d1c17d530986b97fb4");
      xhttp.send();
    });
  }

  addWord(name: string): boolean {
    if (!name) { return true; }

    let workingWord = this.getWord(name);
    let wordDefinition: Object;
    let self = this;

    if (workingWord == null) {
      self.getWordDefinition(name)
                        .subscribe(
                          response => {
                            wordDefinition = response.results[0];
                            workingWord = new Word(name, response.results[0], 1);
                            self.wordListService.addWord(workingWord)
                                              .subscribe(
                                                () => self.wordList.push(workingWord),
                                                error => self.errorMessage = <any>error
                                              )
                          });
    }
    else {
      workingWord.frequency++;
      self.wordListService.updateWord(workingWord)
                          .subscribe(
                            error => self.errorMessage = <any>error 
                          );
    };
    
    return false;
  }

  /**
   * Pushes a new word onto the words array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addWord1(name: string): boolean {
    if (!name) { return true; }

    let workingWord = this.getWord(name);

    if (workingWord == null) {
      workingWord = new Word (name, "Waiting for definition...", 1);
      this.wordListService.addWord(workingWord)
                        .subscribe(
                          () => this.wordList.push(workingWord),
                          error => this.errorMessage = <any>error
                        );
    }
    else {
      workingWord.frequency++;
      this.wordListService.updateWord(workingWord)
                          .subscribe(
                            error => this.errorMessage = <any>error 
                          );
    };
    return false;
  }

  /**
   * Delete a word from the words array
   * TODO
   */
  deleteWord(name: string) {
    let deleteWord = this.getWord(name);
    if (deleteWord == null) return;

    this.wordListService.deleteWord(deleteWord)
                        .subscribe(
                          data => {
                            var index = this.wordList.indexOf(deleteWord);
                            if (index > -1) {
                              this.wordList.splice(index, 1);
                            }
                          },
                          error => this.errorMessage = <any>error
                        );
  }

}
