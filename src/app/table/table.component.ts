import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {Book} from "../models/book";
import {Author} from "../models/author";
import {BookService} from "../Services/book.service";
import {AuthorService} from "../Services/author.service";
import {first, map, takeUntil, tap} from "rxjs/operators";
import {LibraryService} from "../Services/library.service";
import {RawElement} from "../models/rawElement";
import {Observable, of, Subject, zip} from "rxjs";
import {FilterModel} from "../models/filter.model";
import {CommunicationService} from "../Services/communication.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy{

  books = this.bookService.getBooks();
  tableElements: RawElement[] = [];
  destroy$ = new Subject();

  constructor(private bookService: BookService, private authorService: AuthorService,
              private libraryService: LibraryService,private comService: CommunicationService) {
  }

  ngOnInit(): void {
    this.comService.getFilteredData().pipe(takeUntil(this.destroy$))
      .subscribe( value => this.createTable(this.libraryService.filterBookInService(this.books,value)));

  }

  createTable(books: Observable<Book[]>){
    zip(books, this.authorService.getAuthors()).pipe(
      map(([books, authors]) => {
        return books.map(item => ({
          title: item.title,
          author: this.authorService.getAuthorFullName(this.libraryService.findAuthorById(authors, item.authorId)),
          readOn: item.read,
          pageCount: item.pageCount
        }) as RawElement)
      })
    ).subscribe(val => this.tableElements = val)
  }

  ngOnDestroy(){
    this.destroy$.next();
  }

}
