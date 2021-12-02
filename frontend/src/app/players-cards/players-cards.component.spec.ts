import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersCardsComponent } from './players-cards.component';

describe('CardFieldComponent', () => {
  let component: PlayersCardsComponent;
  let fixture: ComponentFixture<PlayersCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
