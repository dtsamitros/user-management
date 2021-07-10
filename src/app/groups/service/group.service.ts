import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../model/group.model';

@Injectable()
export class GroupService {
  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<Group[]> {
    return this.http.get<Group[]>('/api/groups');
  }

  getById(id: string): Observable<Group> {
    return this.http.get<Group>(`/api/groups/${id}`);
  }

  update(id: string, updates: Partial<Group>): Observable<Group> {
    return this.http.put<Group>(`/api/groups/${id}`, updates);
  }

  create(data: Partial<Group>) {
    return this.http.post('/api/groups', data);
  }

  delete(id: number) {
    return this.http.delete(`/api/groups/${id}`);
  }

  removeUserFromGroup(userId: number, groupId: number) {
    return this.http.post(`/api/groups/${groupId}/remove/${userId}`, null);
  }


}
