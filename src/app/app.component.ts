import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Author} from "./author";
import {AuthorService} from "./Services/author.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authorService: AuthorService) {
  }
  title = 'my-book-list';
  authors$: Observable<Author[]> = this.authorService.getAuthors();

}
