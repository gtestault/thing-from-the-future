import { TestBed } from '@angular/core/testing';

import { PlayerRegisteredGuard } from './player-registered.guard';

describe('PlayerRegisteredGuard', () => {
  let guard: PlayerRegisteredGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PlayerRegisteredGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
