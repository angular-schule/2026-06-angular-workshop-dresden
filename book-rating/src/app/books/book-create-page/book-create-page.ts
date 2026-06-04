import { Component, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { apply, applyEach, applyWhen, form, FormField, FormRoot, max, maxLength, min, minLength, provideSignalFormsConfig, required, schema, validate } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { BookStore } from '../shared/book-store';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

const isbnSchema = schema<string>(path => {
  required(path, { message: 'ISBN ist erforderlich.' });
  minLength(path, 10, { message: 'ISBN ist zu kurz.' });
  maxLength(path, 13, { message: 'ISBN ist zu kurz.' });

  validate(path, (ctx) => {
    if (!ctx.value().startsWith('978')) {
      return {
        kind: 'isbnprefix',
        message: 'ISBN muss mit 978 beginnen'
      };
    }

    return undefined;
  });
})


const bookSchema = schema<Book>(path => {
    apply(path.isbn, isbnSchema);

    applyWhen(
      path.description,
      (ctx) => ctx.stateOf(path.title).valid(),
      pathWhenTrue => {
        required(pathWhenTrue);
      }
    );

    required(path.title, { message: 'Titel ist erforderlich.' });

    required(path.price, { message: 'Preis ist erforderlich.' });
    min(path.price, 0, { message: 'Preis muss größer 0.' });

    required(path.rating, { message: 'Rating ist erforderlich.' });
    min(path.rating, 1, { message: 'Rating muss zwischen 1 und 5.' });
    max(path.rating, 5, { message: 'Rating muss zwischen 1 und 5.' });

    minLength(path.authors, 1);
    applyEach(path.authors, authorPath => {
      required(authorPath);
      minLength(authorPath, 2);
    })
  });


@Component({
  selector: 'app-book-create-page',
  imports: [FormField, JsonPipe, FormRoot],
  templateUrl: './book-create-page.html',
  styleUrl: './book-create-page.scss',
  providers: [
    provideSignalFormsConfig({
      classes: {
        invalid: (formField) => formField.state().touched() && formField.state().invalid()
      }
    })
  ]
})
export class BookCreatePage {
  #store = inject(BookStore);
  #router = inject(Router);

  // Datenmodell
  readonly bookFormData = signal<Book>({
    isbn: '',
    title: '',
    description: '',
    rating: 1,
    price: 0,
    authors: ['', '']
  });

  // Formularmodell
  readonly bookForm = form(
    this.bookFormData,
    // Schema
    bookSchema,
    {
      submission: {
        // muss mit Promises (async/await) arbeiten
        action: async (f) => {
          console.log(f().value());
          try {
            await firstValueFrom(this.#store.create(f().value()));
            await this.#router.navigate(['/books', f.isbn().value()])
            return;
          } catch(e) {
            console.error(e);
            return [
              {
                kind: 'isbnalreadyused',
                message: 'ISBN existiert bereits.',
                fieldTree: f.isbn
              }
            ]
          }
        }
      }
    }
  );

  addAuthorField() {
    this.bookForm.authors().value.update(authors => [...authors, '']);
  }

  removeAuthorField(i: number) {
    this.bookForm.authors().value.update(authors => authors.filter((value, index) => index !== i));
  }
}
