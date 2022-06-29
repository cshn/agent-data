import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

import { HttpClientModule }    from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardActiveAgentComponent } from './dashboard-active-agent/dashboard-active-agent.component';
import { DashboardTypeComponent } from './dashboard-type/dashboard-type.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SideBarComponent,
    NavBarComponent,
    DashboardActiveAgentComponent,
    DashboardTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    AgGridModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
