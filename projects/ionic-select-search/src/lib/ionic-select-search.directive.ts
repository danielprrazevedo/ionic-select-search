import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { EventEmitter } from 'events';
import { IonicSelectSearchService } from './ionic-select-search.service';
import { IonicSelectSearchModalComponent } from './modal/ionic-select-search-modal.component';

@Directive({
  selector: 'ion-input[ionic-select-search]',
  providers: [IonicSelectSearchService],
})
export class IonicSelectSearchDirective implements OnInit, OnDestroy {
  private styleRef: HTMLStyleElement;
  @Input()
  public set list(list: any[]) {
    this.service.list = list;
  }

  @Input()
  public set compareWith(fn: (...args) => boolean) {
    this.service.compareWith = fn;
  }

  @Input()
  public set searchControl(control: FormControl) {
    this.service.searchControl = control;
  }

  @Input()
  public set showLoader(show: boolean) {
    this.service.showLoader = show;
  }

  @Input()
  public multi = false;

  @Output()
  public next = new EventEmitter();

  private innerList = new Array<any>();

  public get inputValue(): string {
    const value = this.service.value$.value;
    if (this.multi && Array.isArray(value)) {
      const items = this.service.list.filter((i) =>
        value.find((v) => this.service.compareWith(i.value, v))
      );

      if (items) {
        return items.map((i) => i.label).join(', ');
      }
    }
    const item = this.service.list.find((i) =>
      this.service.compareWith(i, value)
    );
    if (item) {
      return item.label;
    }

    return '';
  }

  constructor(
    private service: IonicSelectSearchService,
    private modalCtrl: ModalController,
    private ref: ElementRef<HTMLIonInputElement>,
    @Optional()
    private ngControl: NgControl,
    private cdr: ChangeDetectorRef
  ) {}

  @HostListener('ionFocus')
  async focusHandler(): Promise<void> {
    this.service.modal = await this.modalCtrl.create({
      component: IonicSelectSearchModalComponent,
      cssClass: 'select-search-background-modal',
      componentProps: {
        service: this.service,
        multi: this.multi,
      },
    });
    this.service.modal.present();
  }

  ngOnInit(): void {
    if (!this.ngControl) {
      throw new Error(
        'You need instance a formControl, ngModel, formControlName or name in your ionic-select-search'
      );
    }
    this.ngControl.valueChanges.subscribe((v) => {
      console.log('ngControl');
      const value = this.service.value$.value;
      if (
        (Array.isArray(v) &&
          Array.isArray(value) &&
          (value.length !== v.length ||
            v.filter((i, index) => this.service.compareWith(value[index], i))
              .length !== v.length)) ||
        !this.service.compareWith(v, value)
      ) {
        this.service.value$.next(v);
      }
    });

    this.service.value$.subscribe((v) => {
      console.log('service');
      this.ngControl.control.setValue(v);
    });

    this.ngControl.valueChanges.subscribe((value) => {
      console.log('otherNgControl');
      let inputValue = '';
      if (this.multi && Array.isArray(value)) {
        const items = this.service.list.filter((i) =>
          value.find((v) => this.service.compareWith(i.value, v))
        );

        if (items) {
          inputValue = items.map((i) => i.label).join(', ');
        }
      } else {
        const item = this.service.list.find((i) =>
          this.service.compareWith(i, value)
        );
        if (item) {
          inputValue = item.label;
        }
      }

      setTimeout(() => {
        this.ref.nativeElement
          .getInputElement()
          .then((input: HTMLInputElement) => {
            input.value = inputValue;
            this.cdr.detectChanges();
          });
      }, 1);
    });

    this.ref.nativeElement.readonly = true;
    this.styleRef = document.createElement('style');
    this.styleRef.innerHTML = `
    .select-search-background-modal {
      --width: 250px;
      --height: 355px;
      --border-radius: 4px;
    }
    `;
    document.body.append(this.styleRef);
  }

  ngOnDestroy(): void {
    this.styleRef.remove();
  }
}
