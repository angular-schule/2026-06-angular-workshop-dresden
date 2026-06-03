import { Component, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookCard } from '../book-card/book-card';
import { BookRatingHelper } from '../shared/book-rating-helper';
import { BookStore } from '../shared/book-store';
import { interval } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  imports: [BookCard],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {

  #ratingHelper = inject(BookRatingHelper);
  #store = inject(BookStore);

  protected readonly books = signal<Book[]>([]);

  constructor() {
    this.#store.getAll().subscribe(receivedBooks => {
      this.books.set(receivedBooks);
    });
  }

  doRateUp(book: Book) {
    const ratedBook = this.#ratingHelper.rateUp(book);
    this.#updateList(ratedBook);
    
  }
  
  doRateDown(book: Book) {
    const ratedBook = this.#ratingHelper.rateDown(book);
    this.#updateList(ratedBook);
  }
  
  doDeleteBook(book: Book) {
    this.#store.delete(book.isbn).subscribe(() => {
      // Liste neuladen
      this.#store.getAll().subscribe(receivedBooks => {
        this.books.set(receivedBooks);
      });
    });
    
  }

  #updateList(ratedBook: Book) {
    // [1,2,3,4].map(e => e * 10) // [10, 20, 30, 40]
    // [1,2,3,4,5,6,7,8].filter(e => e < 5) // [1,2,3,4]
    
    this.books.update(currentList => {
      return currentList.map(b => {
        if (b.isbn === ratedBook.isbn) {
          return ratedBook;
        } else {
          return b;
        }
      })
    })

    // this.books.update(list => list.map(b => b.isbn === ratedBook.isbn ? ratedBook : b));
  }
}