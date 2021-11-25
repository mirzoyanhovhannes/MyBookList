import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Book} from "../models/book";
import {LibraryService} from "./library.service";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  books: Book[] = [];

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    if(this.books.length){
      return of(this.books);
    }
    return this.http.get<Book[]>('assets/DB/books.json').pipe(tap( val => this.books = val));
  }

}
