import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapCardsButtonComponent } from './swap-cards-button.component';

describe('SwapCardsButtonComponent', () => {
  let component: SwapCardsButtonComponent;
  let fixture: ComponentFixture<SwapCardsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwapCardsButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapCardsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
