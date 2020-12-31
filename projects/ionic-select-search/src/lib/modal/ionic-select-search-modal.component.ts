import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicSelectSearchService } from '../ionic-select-search.service';

@Component({
  selector: 'ionic-select-search-modal',
  templateUrl: './ionic-select-search-modal.component.html',
  styleUrls: ['./ionic-select-search-modal.component.css'],
})
export class IonicSelectSearchModalComponent {
  @Input()
  public service: IonicSelectSearchService;

  @Input()
  public multi = false;

  public get radioSelectedValue(): any {
    const index = this.service.list.findIndex((value) =>
      this.service.compareWith(value, this.service.value$.value)
    );
    return this.service.list[index];
  }

  public set radioSelectedValue(value: any) {
    this.service.value$.next(value);
  }

  constructor(private modalCtrl: ModalController) {}

  public checkboxIsSelected(value: any): boolean {
    if (!Array.isArray(this.service.value$.value)) {
      return false;
    }
    return this.service.value$.value.includes((v) =>
      this.service.compareWith(value, v)
    );
  }

  public markCheckBox(event: CustomEvent): void {
    let value = this.service.value$.value;
    if (!Array.isArray(value)) {
      value = [];
    }
    if (event.detail.checked) {
      value.push(event.detail.value);
    } else {
      const index = value.findIndex((v) =>
        this.service.compareWith(v, event.detail.value)
      );
      if (index >= 0) {
        value.splice(index, 1);
      }
    }
    this.service.value$.next(value);
  }

  public ok(): void {
    this.modalCtrl.dismiss({ ok: true });
  }

  public cancel(): void {
    this.modalCtrl.dismiss({ ok: false });
  }
}
