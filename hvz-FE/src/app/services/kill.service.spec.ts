import { TestBed } from '@angular/core/testing';

import { KillService } from './kill.service';

describe('KillService', () => {
  let service: KillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
