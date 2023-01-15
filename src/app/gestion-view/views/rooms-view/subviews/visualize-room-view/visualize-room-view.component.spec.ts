import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizeRoomViewComponent } from './visualize-room-view.component';

describe('VisualizeRoomViewComponent', () => {
  let component: VisualizeRoomViewComponent;
  let fixture: ComponentFixture<VisualizeRoomViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizeRoomViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizeRoomViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
