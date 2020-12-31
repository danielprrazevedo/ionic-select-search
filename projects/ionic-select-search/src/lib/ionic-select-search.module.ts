import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicSelectSearchDirective } from './ionic-select-search.directive';
import { IonicSelectSearchModalComponent } from './modal/ionic-select-search-modal.component';

@NgModule({
  declarations: [IonicSelectSearchDirective, IonicSelectSearchModalComponent],
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule],
  exports: [IonicSelectSearchDirective],
})
export class IonicSelectSearchModule {}
