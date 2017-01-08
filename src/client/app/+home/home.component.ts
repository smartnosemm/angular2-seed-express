import { Component, OnInit } from '@angular/core';
import { WordListService } from '../shared/index';
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
  words: string[] = [];

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
        words => this.words = words,
        error =>  this.errorMessage = <any>error
    );
  }

  /**
   * Pushes a new word onto the words array
   */
  addWord(name: string) {
    if (!name) { return; }

    this.wordListService.addWord(name)
                        .subscribe(
                          () => this.words.push(name),
                          error => this.errorMessage = <any>error
                        );
  }

  /**
   * Update the word information
   */
  /*
  updateWord(name: string) {
    this.wordListService.updateWord(name)
                        .subscribe(
                          error => this.errorMessage = <any>error
                        );
  }
  */

  /**
   * Delete a word from the words array
   */
  deleteWord(name: string) {
    var words = this.words;

    this.wordListService.deleteWord(name)
                        .subscribe(
                          data => {
                            var index = words.indexOf(name);
                            if (index > -1) {
                              words.splice(index, 1);
                            }
                          },
                          error => this.errorMessage = <any>error
                        );
  }

}
