import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
// import { booksRoutes } from './books/books.routes';

export const routes: Routes = [
    // { path: '', redirectTo: 'books', pathMatch: 'full' },
    { path: '', component: HomePage },
    {
        path: 'books',
        loadChildren: () => import('./books/books.routes').then(m => m.booksRoutes)
    }
];
