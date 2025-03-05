import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private googleBooksApiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  searchBooks(query: string, language: string = '', printType: string = 'all', sortOrder: string = 'relevance'): Observable<any> {
    const queryParams = [
      `q=${query}`,
      language ? `langRestrict=${language}` : '',
      `printType=${printType}`,
      `orderBy=${sortOrder}`,
    ]
      .filter(Boolean)
      .join('&');

    const apiUrl = `${this.googleBooksApiUrl}?${queryParams}`;
    return this.http.get(apiUrl);
  }

  getBookDetails(bookId: string): Observable<any> {
    return this.http.get(`${this.googleBooksApiUrl}/${bookId}`);
  }

  getExchangeRate(from: string = 'USD', to: string = 'MXN'): Observable<number> {
    const apiUrl = `https://api.frankfurter.app/latest?from=${from}&to=${to}`;
    return this.http.get(apiUrl).pipe(
      map((response: any) => response.rates[to])
    );
  }
  
}
