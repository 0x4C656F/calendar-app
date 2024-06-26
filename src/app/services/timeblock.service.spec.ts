import { TestBed } from '@angular/core/testing';

import { TimeblockService } from './timeblock.service';

describe('TimeblockService', () => {
  let service: TimeblockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeblockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
