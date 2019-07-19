import { Component, OnInit } from '@angular/core';
import { Area } from './area';
import { AREA_STATIC } from './area-static';
import { AgentService } from '../agent.service';
import { Transaction } from '../model/transaction';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { IHash } from '../model/ihash';

@Component({
  selector: 'app-dashboard-area',
  templateUrl: './dashboard-area.component.html',
  styleUrls: ['./dashboard-area.component.css']
})
export class DashboardAreaComponent implements OnInit {

  areas: Area[] = AREA_STATIC;
  transactions: Transaction[];
  areaSet = new Set();
  agentSet = new Set();
  agentHash : IHash = {};
  private gridApi;
  private gridColumnApi;
  showbutton = 0;

  constructor(private route: ActivatedRoute,
    private agentService: AgentService, private router: Router) { 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
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
      const area = this.route.snapshot.paramMap.get('area');
      this.agentService.getTransactionByArea(area)
        .subscribe(ts => {
          this.rowData = ts.result.records;
          this.rowData.forEach(e => {
            this.areaSet.add(e.town_txt);
            if (this.agentSet.has(e.salesperson_name)) {
              this.agentHash[e.salesperson_name] = this.agentHash[e.salesperson_name] + 1;
            } else {
              this.agentSet.add(e.salesperson_name);
              this.agentHash[e.salesperson_name] = 1;
            }
          })
      }); 
  }

  topAgent(): void {
    var chartData = [];
    this.barChartData = [];
    this.barChartLabels = [];
    this.agentSet.forEach(e => {
      if(this.agentHash[e] > 20) {
        this.barChartLabels.push(e);
        chartData.push(this.agentHash[e]);
      }
    })
    this.barChartData.push({data: chartData, label: "Top Agent"});
    this.areaSet.forEach(e => {
      console.log('{"town_txt": "' + e + '"},');
    })
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
