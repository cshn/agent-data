import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAreaComponent } from './dashboard-area.component';

describe('DashboardAreaComponent', () => {
  let component: DashboardAreaComponent;
  let fixture: ComponentFixture<DashboardAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
