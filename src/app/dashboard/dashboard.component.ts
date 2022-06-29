import { Component, OnInit } from '@angular/core';
import { AgentService } from '../agent.service';
import { Transaction } from '../model/transaction';
import { IHash } from '../model/ihash';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  transactions: Transaction[];
  areaSet = new Set();
  agentSet = new Set();
  agentHash : IHash = {};
  private gridApi;
  private gridColumnApi;
  showbutton = 0;
  
 
  constructor(private agentService: AgentService) { }

  ngOnInit() {
    this.getTransactionData();
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

  getTransactionData(): void {
    this.agentService.getAllTransactions()
      .subscribe(transactions => {
        this.rowData = transactions.result.records;
        this.rowData.forEach(e => {
          e.transaction_date = moment(new Date(e.transaction_date)).format('YYYY-MM-DD');
          this.areaSet.add(e.town);
          if (this.agentSet.has(e.salesperson_name)) {
            this.agentHash[e.salesperson_name] = this.agentHash[e.salesperson_name] + 1;
          } else {
            this.agentSet.add(e.salesperson_name);
            this.agentHash[e.salesperson_name] = 1;
          }
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
    this.showbutton = 1;
  }
}
