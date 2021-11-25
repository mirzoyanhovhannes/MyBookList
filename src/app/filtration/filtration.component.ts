import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AuthorService} from "../Services/author.service";
import {BehaviorSubject, fromEvent, Observable} from "rxjs";
import {Author} from "../models/author";
import {debounceTime, map, tap} from "rxjs/operators";
import {FilterModel} from "../models/filter.model";
import {CommunicationService} from "../Services/communication.service";

@Component({
  selector: 'app-filtration',
  templateUrl: './filtration.component.html',
  styleUrls: ['./filtration.component.css']
})
export class FiltrationComponent implements OnInit {

  tableFilter: FormGroup = new FormGroup({});
  authors$: Observable<Author[]> = this.authorService.getAuthors();

  constructor(private authorService: AuthorService, private fb: FormBuilder, private comService: CommunicationService ) { }

  ngOnInit(): void {
    this.tableFilter = this.fb.group({
      author: [],
      readOn: [],
      pageCount: []
    });

    this.tableFilter.valueChanges.pipe(debounceTime(1000)).subscribe(value => this.comService.filterSubject.next(value));

  }

}
