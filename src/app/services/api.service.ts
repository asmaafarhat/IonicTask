import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from './product';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
   apiUrl = 'http://tindiostag.tindio.com/api/home';
  // http://tindiostag.tindio.com/api/home?items_per_page=24&page=0

  getProducts(pageData): Observable<Product[]> {
    const url = `${this.apiUrl}?items_per_page=${pageData.items_per_page}&page=${pageData.page}`;
    return this.http.get<Product[]>(url)
      .pipe(
        tap(product => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }
}
