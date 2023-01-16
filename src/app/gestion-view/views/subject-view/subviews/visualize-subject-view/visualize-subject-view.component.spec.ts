import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizeSubjectViewComponent } from './visualize-subject-view.component';

describe('VisualizeSubjectViewComponent', () => {
  let component: VisualizeSubjectViewComponent;
  let fixture: ComponentFixture<VisualizeSubjectViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizeSubjectViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizeSubjectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
