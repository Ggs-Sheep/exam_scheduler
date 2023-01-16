import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceAdderViewComponent } from './absence-adder-view.component';

describe('AbsenceAdderViewComponent', () => {
  let component: AbsenceAdderViewComponent;
  let fixture: ComponentFixture<AbsenceAdderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsenceAdderViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsenceAdderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
