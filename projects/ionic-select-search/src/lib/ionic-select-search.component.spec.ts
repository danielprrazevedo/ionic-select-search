import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IonicSelectSearchComponent } from './ionic-select-search.component';

describe('IonicSelectSearchComponent', () => {
  let component: IonicSelectSearchComponent;
  let fixture: ComponentFixture<IonicSelectSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IonicSelectSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IonicSelectSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
