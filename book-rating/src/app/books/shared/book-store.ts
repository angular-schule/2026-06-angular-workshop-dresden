import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service, Signal } from '@angular/core';
import { Book } from './book';

@Service()
export class BookStore {
    #http = inject(HttpClient);
    #apiUrl = 'https://api.angular.schule';

    getAll() {
        return this.#http.get<Book[]>(this.#apiUrl + '/books');
    }

    getAllResource() {
        return httpResource<Book[]>(
            () => this.#apiUrl + '/books',
            { defaultValue: [] }
        );
    }

    getSingleResource(isbn: () => string) {
        return httpResource<Book>(() => `https://api.angular.schule/books/${isbn()}`);
    }

    getSingle(isbn: string) {
        return this.#http.get<Book>(`${this.#apiUrl}/books/${isbn}`);
        // return this.#http.get<Book>(this.#apiUrl + '/books/' + isbn);
    }

    // updateRating() {}

    create(book: Book) {
        return this.#http.post<Book>(`${this.#apiUrl}/books`, book);
    }

    search(term: string) {
        return this.#http.get<Book[]>(`${this.#apiUrl}/books/search/${term}`);
    }

    delete(isbn: string) {
        return this.#http.delete<unknown>(`${this.#apiUrl}/books/${isbn}`)
    }
}
