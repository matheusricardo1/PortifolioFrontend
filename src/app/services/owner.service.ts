import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Owner } from '../models/owner.model';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private apiUrl = `${API_URL}/owner/`; 

  constructor(private http: HttpClient) { }

  get(): Observable<Owner> {
    return this.http.get<Owner>(this.apiUrl);
  }

  getLastOwner(): Observable<Owner> {
    return this.http.get<Owner[]>(this.apiUrl).pipe(
      map((owners: Owner[]) => owners[owners.length - 1]) // Retorna o último item
    );
  }
  
}
