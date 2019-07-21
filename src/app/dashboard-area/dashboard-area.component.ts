import { Component, OnInit } from '@angular/core';
import { Area } from './area';
import { AREA_STATIC } from './area-static';
import { AgentService } from '../agent.service';
import { Transaction } from '../model/transaction';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { IHash } from '../model/ihash';
import * as moment from 'moment';

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
      const splittedArea = area.replace(/_/i, '/'); 
    //  console.log(splittedArea);
      this.agentService.getTransactionByArea(splittedArea)
        .subscribe(ts => {
          this.rowData = ts.result.records;
          ts.complete_date_txt = moment(new Date(ts.complete_date_txt)).format('YYYY-MM-DD');
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
    this.barChartData = [];
    this.barChartLabels = [];
    this.agentSet.forEach(e => {
      if(this.agentHash[e] > 1) {
        this.barChartLabels.push(e);
      }
    })
    
    var len = this.barChartLabels.length;
    var dict = this.agentHash;
    var sortedDict = [];
    for (var i = 0; i < len; i++)
    {
        var k = this.barChartLabels[i];
        sortedDict.push({'key': k, 'value':dict[k]});
    }
    
    sortedDict.sort(function(first, second) {
      return second.value - first.value;
    });
    
    //Result
    var chartData = [];
    this.barChartLabels = [];
    sortedDict.slice(0,10).forEach(e => {
      this.barChartLabels.push(e.key);
      chartData.push(e.value);
    })
    this.barChartData.push({data: chartData, label: "Top 10 Agent"});
    
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
