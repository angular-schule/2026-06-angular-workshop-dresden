import { Routes } from "@angular/router";
import { DashboardPage } from "./dashboard-page/dashboard-page";
import { BookDetailsPage } from "./book-details-page/book-details-page";
import { BookCreatePage } from "./book-create-page/book-create-page";
import { BookSearchPage } from "./book-search-page/book-search-page";
import { BooksEntryPage } from "./books-entry-page/books-entry-page";
import { LikedBooksPage } from "./liked-books-page/liked-books-page";
import { authGuard } from "../auth-guard";

export const booksRoutes: Routes = [
    {
        path: '',
        component: BooksEntryPage,
        children: [
            // diese Routen werden in das RouterOutlet der BooksEntryPage gesetzt
            { path: '', component: DashboardPage },
            { path: 'create', component: BookCreatePage, canActivate: [authGuard] },
            { path: 'search', component: BookSearchPage },
            { path: 'favorites', component: LikedBooksPage },
            { path: ':isbn', component: BookDetailsPage },
        ]
    }
];