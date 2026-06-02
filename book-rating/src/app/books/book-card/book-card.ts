import { Component, input } from '@angular/core';
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
}
