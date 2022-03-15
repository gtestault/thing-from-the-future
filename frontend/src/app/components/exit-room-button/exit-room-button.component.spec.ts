import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitRoomButtonComponent } from './exit-room-button.component';

describe('ExitRoomButtonComponent', () => {
  let component: ExitRoomButtonComponent;
  let fixture: ComponentFixture<ExitRoomButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitRoomButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitRoomButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
