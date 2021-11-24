import {Injectable} from '@angular/core';
import {Author} from "../author";
import {Book} from "../book";
import {Observable} from "rxjs";
import {filter, map, switchMap, tap} from "rxjs/operators";
import {FilterModel} from "../filter.model";

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

  private filterBookInService(books:Observable<Book[]>, filter: FilterModel | null){

    if(filter === null){
      return  books;
    }

    if(filter.author) {
      books = this.filterBooksByAuthorId(books, +filter.author);
    }
    if(filter.readOn) {
      books = this.filterBooksByReadOn(books, +filter.readOn);
    }
    if(filter.pageCount) {
      books = this.filterBooksByPageCount(books, +filter.pageCount);
    }

    return books;

  }

  filterBooks(books: Observable<Book[]>, filterData: Observable<FilterModel>) {

    return filterData.pipe(
      switchMap((value:FilterModel) => {
         return this.filterBookInService(books,value)
      })
    )
  }
}
