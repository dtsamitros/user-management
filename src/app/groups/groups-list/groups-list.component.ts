import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../users/model/user.model';
import { UserService } from '../../users/service/user.service';
import { Group } from '../model/group.model';
import { GroupService } from '../service/group.service';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {

  groups$: Observable<Group[]>;

  constructor(
    private groupService: GroupService,
  ) { }

  ngOnInit(): void {
    this.groups$ = this.groupService.getAll();
  }

  deleteGroup(group: Group) {
    if (confirm(`Are you sure to delete ${group.name}?`)) {
      this.groupService.delete(group.id).subscribe(() => {
        this.groups$ = this.groupService.getAll();
      });
    }
  }

}
