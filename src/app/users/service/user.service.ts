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

}
