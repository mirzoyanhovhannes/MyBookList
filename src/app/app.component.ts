import { Component } from '@angular/core';
import {from, Observable, of} from "rxjs";
import {Author} from "./models/author";
import {AuthorService} from "./Services/author.service";
import {FilterModel} from "./models/filter.model";
import {LibraryService} from "./Services/library.service";
import {BookService} from "./Services/book.service";
import {getLocaleExtraDayPeriodRules} from "@angular/common";
import {Book} from "./models/book";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private libraryService: LibraryService, private bookService: BookService, private authorService: AuthorService) {
  }

  title = 'my-book-list';
  filterData$?: Observable<Book[]>;

  books = this.bookService.getBooks();
  authors = this.authorService.getAuthors();

  filterData(data: Observable<FilterModel>) {
     this.filterData$ = this.libraryService.filterBooks(this.books, data);
  }

}
