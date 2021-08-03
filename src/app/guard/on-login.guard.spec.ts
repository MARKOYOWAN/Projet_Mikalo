import { TestBed } from '@angular/core/testing';

import { OnLoginGuard } from './on-login.guard';

describe('OnLoginGuard', () => {
  let guard: OnLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OnLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
