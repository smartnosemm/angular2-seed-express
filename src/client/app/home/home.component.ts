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
  wordList: Word[] = [];

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

  /**
   * Pushes a new word onto the words array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addWord(name: string): boolean {
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
