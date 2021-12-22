import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyCardSpacesComponent } from './empty-card-spaces.component';

describe('EmptyCardSpacesComponent', () => {
  let component: EmptyCardSpacesComponent;
  let fixture: ComponentFixture<EmptyCardSpacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyCardSpacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyCardSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
