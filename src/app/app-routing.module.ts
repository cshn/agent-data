import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardAreaComponent } from './dashboard-area/dashboard-area.component';
import { DashboardActiveAgentComponent } from './dashboard-active-agent/dashboard-active-agent.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboardactiveagent', component: DashboardActiveAgentComponent },
  { path: 'dashboardarea/:area', component: DashboardAreaComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}