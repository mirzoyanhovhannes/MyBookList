import {Injectable} from '@angular/core';
import {Author} from "../author";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  authors: Author[] = [];

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<Author[]> {
    if(this.authors.length){
      return of(this.authors);
    }
    return this.http.get<Author[]>('assets/DB/authors.json').pipe(tap( val => this.authors = val));
  }

  getAuthorFullName(author: Author) {
    return author.firstName + " " + author.lastName;
  }

}
