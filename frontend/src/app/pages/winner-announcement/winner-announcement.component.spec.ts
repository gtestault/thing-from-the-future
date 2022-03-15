import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerAnnouncementComponent } from './winner-announcement.component';

describe('WinnerAnnouncementComponent', () => {
  let component: WinnerAnnouncementComponent;
  let fixture: ComponentFixture<WinnerAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinnerAnnouncementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WinnerAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
