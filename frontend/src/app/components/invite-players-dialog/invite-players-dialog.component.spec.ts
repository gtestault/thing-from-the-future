import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitePlayersDialogComponent } from './invite-players-dialog.component';

describe('InvitePlayersDialogComponent', () => {
  let component: InvitePlayersDialogComponent;
  let fixture: ComponentFixture<InvitePlayersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitePlayersDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitePlayersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
