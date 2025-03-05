import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
})
export class BookSearchComponent {
  searchQuery = '';
  language = '';
  printType = 'all';
  sortOrder = 'relevance';
  books: any[] = [];

  constructor(private bookService: BookService) {}

  onSearch() {
    this.bookService.searchBooks(this.searchQuery, this.language, this.printType, this.sortOrder)
      .subscribe((response: any) => {
        this.books = response.items || [];
      });
  }
}
