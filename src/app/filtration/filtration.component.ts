import {Component, OnInit, } from '@angular/core';
import {FormBuilder,FormGroup} from "@angular/forms";
import {AuthorService} from "../Services/author.service";
import {Observable} from "rxjs";
import {Author} from "../models/author";
import {debounceTime} from "rxjs/operators";
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

    this.tableFilter.valueChanges.pipe(debounceTime(1000)).subscribe(value => this.comService.setSubjectValue(value));

  }

}
