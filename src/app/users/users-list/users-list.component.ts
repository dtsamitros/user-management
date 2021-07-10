import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {

  users$: Observable<User[]>;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.users$ = this.userService.getAll();
  }

}
