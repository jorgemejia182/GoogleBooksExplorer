import { Routes } from '@angular/router';
import { BookSearchComponent } from './books/book-search/book-search.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';

export const routes: Routes = [
  { path: '', component: BookSearchComponent },
  { path: 'book/:id', component: BookDetailsComponent },
  { path: '**', redirectTo: '' },
];
