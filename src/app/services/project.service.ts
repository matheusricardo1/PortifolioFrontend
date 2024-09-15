import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';
import { Project } from '../models/project.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = `${API_URL}/projects/`; 

  constructor(private http: HttpClient) { }

  get(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }
}
