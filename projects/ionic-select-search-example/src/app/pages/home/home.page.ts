import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { OptionSelectSearch } from 'select-search';
import list from './list.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class HomePage implements OnInit {
  public searchControl = new FormControl();
  public selectList: OptionSelectSearch<string>[];
  public get simpleSelect(): any[] {
    return list;
  }

  constructor() {}

  ngOnInit(): void {
    this.selectList = list.map((item) => ({
      value: item.email,
      label: item.name,
    }));
    this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value: string) => {
        this.selectList = list
          .filter(
            (item) =>
              item.name
                .toLocaleLowerCase()
                .includes(value.toLocaleLowerCase()) ||
              item.email.toLocaleLowerCase().includes(value.toLocaleLowerCase())
          )
          .map((item) => ({
            value: item.email,
            label: item.name,
          }));
      });
  }
}
