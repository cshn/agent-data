import { Component, OnInit } from '@angular/core';
import { AgentService } from '../agent.service';
import { Transaction } from '../model/transaction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  transactions: Transaction[];
  private gridApi;
  private gridColumnApi;
 
  constructor(private agentService: AgentService) { }

  ngOnInit() {
    this.getTransactionData();
  }

  columnDefs = [
    {headerName: 'salesperson_reg_no', field: 'salesperson_reg_no', filter: true, resizable: true, sortable: true},
    {headerName: 'town_txt', field: 'town_txt', filter: true, resizable: true, sortable: true},
    {headerName: 'salesperson_name', field: 'salesperson_name', filter: true, resizable: true, sortable: true},
    {headerName: 'complete_date_txt', field: 'complete_date_txt', filter: true, resizable: true, sortable: true},
    {headerName: 'represented', field: 'represented', filter: true, resizable: true, sortable: true}
  ];

  rowData = [
  ];

  getTransactionData(): void {
    this.agentService.getAllTransactions()
      .subscribe(transactions => {
        console.log(transactions);
        this.transactions = transactions.result.records;
        this.rowData = this.transactions;
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
