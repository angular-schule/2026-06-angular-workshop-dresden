import { httpResource } from '@angular/common/http';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../shared/book';
import { BookStore } from '../shared/book-store';

@Component({
  selector: 'app-book-details-page',
  imports: [RouterLink],
  templateUrl: './book-details-page.html',
  styleUrl: './book-details-page.scss',
})
export class BookDetailsPage {
  readonly isbn = input.required<string>();
  readonly book = inject(BookStore).getSingleResource(this.isbn);
}
