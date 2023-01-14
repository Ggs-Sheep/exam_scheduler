import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubjectViewComponent } from './add-subject-view.component';

describe('AddSubjectViewComponent', () => {
  let component: AddSubjectViewComponent;
  let fixture: ComponentFixture<AddSubjectViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubjectViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubjectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
