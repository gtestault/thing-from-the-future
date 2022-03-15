import { TestBed } from '@angular/core/testing';

import { FutureThingsService } from './future-things.service';

describe('FutureThingsService', () => {
  let service: FutureThingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FutureThingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
