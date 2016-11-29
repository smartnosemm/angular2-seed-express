import { Component, OnInit } from '@angular/core';
import { WordListService } from '../shared/index';
import { Word } from '../../../shared/word';

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
  words: Word[] = [];
  self = this;

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
    this.wordListService.get()
      .subscribe(
        words => this.words = words,
        error =>  this.errorMessage = <any>error
    );
  }

  /**
   * Pushes a new name onto the names array
   */
  addWord(name: string) {
    if (!name) { return; }

    this.wordListService.addWord(name)
                        .subscribe(
                          () => this.words.push(new Word(name, '')),
                          error => this.errorMessage = <any>error
                        );
  }

}
