import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyCardSpaceComponent } from './empty-card-space.component';

describe('EmptyCardSpaceComponent', () => {
  let component: EmptyCardSpaceComponent;
  let fixture: ComponentFixture<EmptyCardSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyCardSpaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyCardSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
