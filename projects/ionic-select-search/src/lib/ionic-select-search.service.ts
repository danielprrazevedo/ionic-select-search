import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

export interface OptionSelectSearch<T = any> {
  value: T;
  label: string;
}

@Injectable({ providedIn: 'root' })
export class IonicSelectSearchService<T = any> {
  list: OptionSelectSearch<T>[] = [];
  searchControl = new FormControl();
  value$ = new BehaviorSubject<T | T[]>(null);
  showLoader = false;
  modal: HTMLIonModalElement;
  compareWith(itemValue: T, selectedValue: T): boolean {
    return itemValue === selectedValue;
  }
}
