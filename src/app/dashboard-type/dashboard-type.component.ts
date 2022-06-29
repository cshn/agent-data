import { Component, OnInit } from '@angular/core';
import { Ttype } from './ttype';
import { TTYPE_STATIC } from './ttype-static';
import { AgentService } from '../agent.service';
import { Transaction } from '../model/transaction';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard-type',
  templateUrl: './dashboard-type.component.html',
  styleUrls: ['./dashboard-type.component.css']
})
export class DashboardTypeComponent implements OnInit {

  areas: Ttype[] = TTYPE_STATIC;
  transactions: Transaction[];
  private gridApi;
  private gridColumnApi;

  constructor(private route: ActivatedRoute,
    private agentService: AgentService, private router: Router) { 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  columnDefs = [
    {headerName: 'salesperson_reg_num', field: 'salesperson_reg_num', filter: true, resizable: true, sortable: true},
    {headerName: 'town', field: 'town', filter: true, resizable: true, sortable: true},
    {headerName: 'salesperson_name', field: 'salesperson_name', filter: true, resizable: true, sortable: true},
    {headerName: 'transaction_date', field: 'transaction_date', filter: true, resizable: true, sortable: true},
    {headerName: 'district', field: 'district', filter: true, resizable: true, sortable: true},
    {headerName: 'property_type', field: 'property_type', filter: true, resizable: true, sortable: true},
    {headerName: 'transaction_type', field: 'transaction_type', filter: true, resizable: true, sortable: true},
    {headerName: 'general_location', field: 'general_location', filter: true, resizable: true, sortable: true},
    {headerName: 'represented', field: 'represented', filter: true, resizable: true, sortable: true}
  ];

  rowData = [
  ];

  ngOnInit() {
    this.getTrans();
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [];

  update() {
    this.getTrans(); 
  }

  getTrans(): void {
      const type = this.route.snapshot.paramMap.get('type');
      this.agentService.getTransactionByArea(type)
        .subscribe(ts => {
          this.rowData = ts.result.records;
          this.rowData.forEach(e => {
            e.transaction_date = moment(new Date(e.transaction_date)).format('YYYY-MM-DD');
          })
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
    this.autoSizeAll();
  }

}
