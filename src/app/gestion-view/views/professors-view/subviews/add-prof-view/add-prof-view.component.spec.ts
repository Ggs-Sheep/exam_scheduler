import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfViewComponent } from './add-prof-view.component';

describe('AddProfViewComponent', () => {
  let component: AddProfViewComponent;
  let fixture: ComponentFixture<AddProfViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProfViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProfViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
