import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClassViewComponent } from './add-class-view.component';

describe('AddClassViewComponent', () => {
  let component: AddClassViewComponent;
  let fixture: ComponentFixture<AddClassViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClassViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClassViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
