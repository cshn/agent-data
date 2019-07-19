import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardActiveAgentComponent } from './dashboard-active-agent.component';

describe('DashboardActiveAgentComponent', () => {
  let component: DashboardActiveAgentComponent;
  let fixture: ComponentFixture<DashboardActiveAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardActiveAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardActiveAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
