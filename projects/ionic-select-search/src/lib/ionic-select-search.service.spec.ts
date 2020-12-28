import { TestBed } from '@angular/core/testing';

import { IonicSelectSearchService } from './ionic-select-search.service';

describe('IonicSelectSearchService', () => {
  let service: IonicSelectSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IonicSelectSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
