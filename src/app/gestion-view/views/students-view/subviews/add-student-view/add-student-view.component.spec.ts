import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentViewComponent } from './add-student-view.component';

describe('AddStudentViewComponent', () => {
  let component: AddStudentViewComponent;
  let fixture: ComponentFixture<AddStudentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStudentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
