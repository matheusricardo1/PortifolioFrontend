import { Injectable } from '@angular/core';
import { API_URL } from '../constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../models/services.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = `${API_URL}/services/`; 

  constructor(private http: HttpClient) { }

  get(): Observable<Service[]> {
    return this.http.get<Service[]>(this.apiUrl);
  }
}
