import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorsViewComponent } from './professors-view.component';

describe('ProfessorsViewComponent', () => {
  let component: ProfessorsViewComponent;
  let fixture: ComponentFixture<ProfessorsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
