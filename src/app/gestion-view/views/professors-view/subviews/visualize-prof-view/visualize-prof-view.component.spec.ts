import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizeProfViewComponent } from './visualize-prof-view.component';

describe('VisualizeProfViewComponent', () => {
  let component: VisualizeProfViewComponent;
  let fixture: ComponentFixture<VisualizeProfViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizeProfViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizeProfViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
