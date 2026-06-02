import { Service } from '@angular/core';
import { Book } from './book';

// bis Angular 21: @Injectable({ providedIn: 'root' })
@Service() // ab Angular 22
export class BookRatingHelper {
    
    rateUp(book: Book): Book {
        return book; // TODO
    }
    
    rateDown(book: Book): Book {
        return book; // TODO
    }
}
