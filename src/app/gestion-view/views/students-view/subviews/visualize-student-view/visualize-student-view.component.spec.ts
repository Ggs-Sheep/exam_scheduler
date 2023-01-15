import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizeStudentViewComponent } from './visualize-student-view.component';

describe('VisualizeStudentViewComponent', () => {
  let component: VisualizeStudentViewComponent;
  let fixture: ComponentFixture<VisualizeStudentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizeStudentViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizeStudentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
