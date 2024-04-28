import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const NAV_URL = environment.apiURL;
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private _http : HttpClient) { }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this._http.post<any>(`${NAV_URL}/documents/upload`, formData);
  }
  downloadFile(fileName: string): Observable<Blob> {
    return this._http.get(`${NAV_URL}/documents/download/${fileName}`, { responseType: 'blob' });
  }
}
