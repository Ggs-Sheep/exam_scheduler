import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAbsenceViewComponent } from './my-absence-view.component';

describe('MyAbsenceViewComponent', () => {
  let component: MyAbsenceViewComponent;
  let fixture: ComponentFixture<MyAbsenceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAbsenceViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAbsenceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
