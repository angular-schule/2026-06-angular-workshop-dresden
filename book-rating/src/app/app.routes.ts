import { Routes } from '@angular/router';
import { booksRoutes } from './books/books.routes';
import { HomePage } from './home-page/home-page';

export const routes: Routes = [
    // { path: '', redirectTo: 'books', pathMatch: 'full' },
    { path: '', component: HomePage },
    ...booksRoutes
];
