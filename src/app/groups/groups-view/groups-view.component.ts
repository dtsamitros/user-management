import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../service/group.service';
import { Group } from '../model/group.model';
import { User } from '../../users/model/user.model';

@Component({
  selector: 'app-groups-view',
  templateUrl: './groups-view.component.html',
  styleUrls: ['./groups-view.component.css']
})
export class GroupsViewComponent implements OnInit {

  group$: Observable<Group>;

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.group$ = this.groupService.getById(this.route.snapshot.params['id']);
  }

  removeUserFromGroup(user: User, group: Group) {
    if (confirm(`Are you sure to delete ${user.name} from ${group.name}?`)) {
      this.groupService.removeUserFromGroup(user.id, group.id).subscribe(() => {
        this.fetchData();
      });
    }
  }



}
