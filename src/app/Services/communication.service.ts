import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {FilterModel} from "../models/filter.model";

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private filterSubject = new BehaviorSubject<FilterModel>({} as FilterModel);
  filteredSubject$ = this.filterSubject.asObservable();
  constructor() { }


  setSubjectValue(data: FilterModel){
    this.filterSubject.next(data);
  }


}
