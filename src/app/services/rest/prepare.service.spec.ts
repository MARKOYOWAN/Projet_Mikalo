import { TestBed } from '@angular/core/testing';

import { PrepareService } from './prepare.service';

describe('PrepareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrepareService = TestBed.get(PrepareService);
    expect(service).toBeTruthy();
  });
});
