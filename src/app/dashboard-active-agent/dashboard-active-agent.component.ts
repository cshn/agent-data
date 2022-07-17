import { Component, OnInit } from '@angular/core';
import { AgentService } from '../agent.service';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard-active-agent',
  templateUrl: './dashboard-active-agent.component.html',
  styleUrls: ['./dashboard-active-agent.component.css']
})
export class DashboardActiveAgentComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  showbutton;
 
  constructor(private agentService: AgentService) { }

  ngOnInit() {
    this.showbutton=true;
    this.getAgentData();
  }

  columnDefs = [
    {headerName: 'estate_agent_license_no', field: 'estate_agent_license_no', filter: true, resizable: true, sortable: true},
    {headerName: 'registration_no', field: 'registration_no', filter: true, resizable: true, sortable: true},
    {headerName: 'salesperson_name', field: 'salesperson_name', filter: true, resizable: true, sortable: true},
    {headerName: 'registration_start_date', field: 'registration_start_date', filter: true, resizable: true, sortable: true},
    {headerName: 'registration_end_date', field: 'registration_end_date', filter: true, resizable: true, sortable: true},
    {headerName: 'estate_agent_name', field: 'estate_agent_name', filter: true, resizable: true, sortable: true}
  ];

  rowData = [
  ];

  getAgentData(): void {
    this.agentService.getAllAgents()
      .subscribe(agents => {
        this.rowData = agents.result.records;
        
      });
  }

  autoSizeAll() {
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function(column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.showbutton=false;
    this.autoSizeAll();
  }

}
