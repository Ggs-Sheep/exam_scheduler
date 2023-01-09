import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWatchViewComponent } from './my-watch-view.component';

describe('MyWatchViewComponent', () => {
  let component: MyWatchViewComponent;
  let fixture: ComponentFixture<MyWatchViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyWatchViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyWatchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
