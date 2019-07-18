import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {Transaction} from './model/transaction';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private agentDataUrl = 'https://data.gov.sg/api/action/datastore_search?resource_id=8a087b7c-a11b-4da8-bbb6-ac933f465acd&limit=80000';  // URL to web api
  
  constructor(private http: HttpClient) { }
  
  getAllTransactions(): Observable<any> {
    const url = `${this.agentDataUrl}`;
    return this.http.get<any>(url);
  }
}
