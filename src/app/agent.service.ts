import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {Transaction} from './model/transaction';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private agentDataUrl = 'https://data.gov.sg/api/action/datastore_search?resource_id=8a087b7c-a11b-4da8-bbb6-ac933f465acd&limit=600000';  // URL to web api
  
  private agentActiveUrl = 'https://data.gov.sg/api/action/datastore_search?resource_id=a41ce851-728e-4d65-8dc5-e0515a01ff31&limit=50000';

  constructor(private http: HttpClient) { }
  
  getAllTransactions(): Observable<any> {
    const url = `${this.agentDataUrl}`;
    return this.http.get<any>(url);
  }

  getTransactionByArea(area: String): Observable<any> {
    const url = `${this.agentDataUrl}&q=${area}`;
    //console.log(url);
    return this.http.get<any>(url);
  }

  getAllAgents(): Observable<any> {
    const url = `${this.agentActiveUrl}`;
    return this.http.get<any>(url);
  }
}
