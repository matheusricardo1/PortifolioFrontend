import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Owner } from '../models/owner.model';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private apiUrl = 'http://127.0.0.1:8000/owner/'; 

  constructor(private http: HttpClient) { }

  get(): Observable<Owner> {
    return this.http.get<Owner>(this.apiUrl);
  }
}
