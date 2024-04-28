import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
const NAV_URL = environment.apiURL;
@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private _http : HttpClient) { }

  generateReport(): Observable<Blob> {
    const url = `${NAV_URL}/reports/generate`; // Replace with your actual API endpoint
    const headers = new HttpHeaders({ 'responseType': 'blob' });
    return this._http.get<Object>(url, { headers }) as Observable<Blob>;

  }
}
