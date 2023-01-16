import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespoPlanningCreatorComponent } from './respo-planning-creator.component';

describe('RespoPlanningCreatorComponent', () => {
  let component: RespoPlanningCreatorComponent;
  let fixture: ComponentFixture<RespoPlanningCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespoPlanningCreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RespoPlanningCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
