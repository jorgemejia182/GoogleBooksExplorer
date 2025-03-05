import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book-service.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent {
  book: any;
  convertedPrice: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit() {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.bookService.getBookDetails(bookId).pipe(
        switchMap((book: any) => {
          this.book = book;
          const currency = book?.saleInfo?.retailPrice?.currencyCode;
          const price = book?.saleInfo?.retailPrice?.amount;
          if (book?.saleInfo?.saleability === 'FOR_SALE' && currency === 'USD') {
            return this.bookService.getExchangeRate('USD', 'MXN').pipe(
              map((rate: number) => price * rate)
            );
          }
          return of(null);
        })
      ).subscribe((convertedPrice: number | null) => {
        this.convertedPrice = convertedPrice;
      });
    }
  }
}