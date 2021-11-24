import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {Book} from "../book";
import {Author} from "../author";
import {BookService} from "../Services/book.service";
import {AuthorService} from "../Services/author.service";
import {first, map, tap} from "rxjs/operators";
import {LibraryService} from "../Services/library.service";
import {RawElement} from "../rawElement";
import {Observable, zip} from "rxjs";
import {FilterModel} from "../filter.model";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  books: Observable<Book[]> = this.getBooks();
  tableElements: RawElement[] = [];
  @Input() filterData?: FilterModel | null;

  constructor(private bookService: BookService, private authorService: AuthorService, private libraryService: LibraryService) {
  }

  ngOnInit(): void {
    this.createTable(this.books);
  }

  createTable(books: Observable<Book[]>){
    zip(books, this.getAuthors()).pipe(
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

  /* async table(){
     let booksArray:Book[] = [];
     let authorsArray:Author[] = [];
     await this.bookService.getBooks().toPromise().then(res => booksArray = res);
     await this.authorService.getAuthors().toPromise().then(res => authorsArray = res);


   }*/

  getBooks() {
    return this.bookService.getBooks()
    // .subscribe(value => this.books = value);
  }

  getAuthors() {
    return this.authorService.getAuthors()
    // .subscribe( authors => this.authors = authors);
  }

  ngOnChanges(changes:SimpleChanges): void{

    const filter = changes['filterData'];

    let books;

    books = this.libraryService.filterBooks(this.books,filter.currentValue);

    this.createTable(books);

  }


}
