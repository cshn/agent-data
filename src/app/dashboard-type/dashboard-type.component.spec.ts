import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTypeComponent } from './dashboard-type.component';

describe('DashboardTypeComponent', () => {
  let component: DashboardTypeComponent;
  let fixture: ComponentFixture<DashboardTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
