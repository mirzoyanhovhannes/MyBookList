import {Injectable} from '@angular/core';
import {Author} from "../author";
import {Book} from "../book";
import {Observable} from "rxjs";
import {filter, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor() {
  }

  findAuthorById(authors: Author[], id: number): Author {
    return authors.find(author => author.id === id) as Author;
  }

  filterBooksByAuthorId(books: Observable<Book[]>, authorId: number): Observable<Book[]> {
    return books.pipe(
      filter(() => !!authorId),
      map(books => books.filter(book => book.authorId === authorId)),
    )
  }

  filterBooksByReadOn(books: Observable<Book[]>, readOn: number): Observable<Book[]> {
    return books.pipe(
      filter(() => !!readOn),
      map(books => books.filter(book => book.read === readOn))
    )
  }

  filterBooksByPageCount(books: Observable<Book[]>, pageCount: number) {
    return books.pipe(
      filter(() => !!pageCount),
      map(books => books.filter(book => book.pageCount === pageCount))
    )
  }

  filterBooks(books: Observable<Book[]>, authorId: number, readOn: number, pageCount: number) {

    return this.filterBooksByPageCount(this.filterBooksByReadOn(this.filterBooksByAuthorId(books,authorId),readOn), pageCount);
  }
}
