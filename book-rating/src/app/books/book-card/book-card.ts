import { Component, computed, input, output } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book-card',
  imports: [],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
})
export class BookCard {
  // Input: hier fließen Daten hinein von der Elternkomponente
  // von oben nach unten
  readonly book = input.required<Book>();
  readonly min = input.required<number>();
  readonly max = input.required<number>();

  // Output: hier fließen Daten hinaus zur Elternkomponente
  // von unten nach oben
  readonly rateUp = output<Book>();
  readonly rateDown = output<Book>();


  readonly rateDownDisabled = computed(() => this.book().rating <= this.min());
  readonly rateUpDisabled = computed(() => this.book().rating >= this.max());

  doRateUp() {
    this.rateUp.emit(this.book());
  }

  doRateDown() {
    this.rateDown.emit(this.book());
  }
}
