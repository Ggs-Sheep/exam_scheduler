import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomViewComponent } from './add-room-view.component';

describe('AddRoomViewComponent', () => {
  let component: AddRoomViewComponent;
  let fixture: ComponentFixture<AddRoomViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRoomViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRoomViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
