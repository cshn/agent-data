import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardTypeComponent } from './dashboard-type/dashboard-type.component';
import { DashboardActiveAgentComponent } from './dashboard-active-agent/dashboard-active-agent.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboardactiveagent', component: DashboardActiveAgentComponent },
  { path: 'dashboardtype/:type', component: DashboardTypeComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}