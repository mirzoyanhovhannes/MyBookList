import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {FilterModel} from "../models/filter.model";

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  filterSubject = new BehaviorSubject<FilterModel>({} as FilterModel);
  constructor() { }


  getFilteredData(){
    return this.filterSubject.asObservable();
  }

}
