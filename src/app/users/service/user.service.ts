import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }

  update(id: string, updates: Partial<User>): Observable<User> {
    return this.http.put<User>(`/api/users/${id}`, updates);
  }

  create(data: Partial<User>) {
    return this.http.post('/api/users', data);
  }

}
