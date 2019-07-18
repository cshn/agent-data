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

  constructor(private agentService: AgentService) { }

  ngOnInit() {
    this.getTransactionData();
  }

  getTransactionData(): void {
    this.agentService.getAllTransactions()
      .subscribe(transactions => {
        console.log(transactions);
        this.transactions = transactions.result.records;
      });
  }
}
