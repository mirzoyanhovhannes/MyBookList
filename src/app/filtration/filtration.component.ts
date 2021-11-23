import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AuthorService} from "../Services/author.service";
import {fromEvent, Observable} from "rxjs";
import {Author} from "../author";
import {debounceTime, map, tap} from "rxjs/operators";

@Component({
  selector: 'app-filtration',
  templateUrl: './filtration.component.html',
  styleUrls: ['./filtration.component.css']
})
export class FiltrationComponent implements OnInit {

  tableFilter: FormGroup = new FormGroup({});
  authors$: Observable<Author[]> = this.authorService.getAuthors();

  selectedInput$?: Observable<any>;
  readOnInput$?: Observable<any>;
  pageCountInput$?:Observable<any>;

  constructor(private authorService: AuthorService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.tableFilter = this.fb.group({
      filterAuthor: [],
      filterReadOn: [],
      filterPageCount: []
    })

    this.selectedInput$ = this.tableFilter.get('filterAuthor')?.valueChanges;
    this.readOnInput$ = this.tableFilter.get('filterReadOn')?.valueChanges;
    this.pageCountInput$ = this.tableFilter.get('filterPageCount')?.valueChanges;

  }

}
