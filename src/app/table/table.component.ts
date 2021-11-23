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

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  books: Observable<Book[]> = this.getBooks();
  authors: Author[] = [];
  tableElements: RawElement[] = [];
  filteredData = this.getBooks();
  @Input() option?: string;
  @Input() readOn?: number;
  @Input() pageCount?: number;

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
    const authorId  = changes['option']?.currentValue;
    const readOn = changes['readOn']?.currentValue;
    const pageCount = changes['pageCount']?.currentValue;



    if(authorId){
      this.filteredData = this.libraryService.filterBooksByAuthorId(this.filteredData,+authorId);
    }

    if(readOn){
      this.filteredData = this.libraryService.filterBooksByReadOn(this.filteredData,+readOn);
    }

    if(pageCount){
      this.filteredData = this.libraryService.filterBooksByPageCount(this.filteredData,+pageCount);
    }

    this.createTable(this.filteredData);

  }

  reset(){
    this.filteredData = this.books;
    this.createTable(this.filteredData);
  }

}
