import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizeClassViewComponent } from './visualize-class-view.component';

describe('VisualizeClassViewComponent', () => {
  let component: VisualizeClassViewComponent;
  let fixture: ComponentFixture<VisualizeClassViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizeClassViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizeClassViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
