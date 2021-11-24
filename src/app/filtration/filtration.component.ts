import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AuthorService} from "../Services/author.service";
import {fromEvent, Observable} from "rxjs";
import {Author} from "../author";
import {debounceTime, map, tap} from "rxjs/operators";
import {FilterModel} from "../filter.model";

@Component({
  selector: 'app-filtration',
  templateUrl: './filtration.component.html',
  styleUrls: ['./filtration.component.css']
})
export class FiltrationComponent implements OnInit {

  tableFilter: FormGroup = new FormGroup({});
  authors$: Observable<Author[]> = this.authorService.getAuthors();

  @Output()filterData = new EventEmitter<Observable<FilterModel>>();

  constructor(private authorService: AuthorService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.tableFilter = this.fb.group({
      author: [],
      readOn: [],
      pageCount: []
    })

    this.filterData.emit(this.tableFilter.valueChanges.pipe(debounceTime(1000)));
  }

}
