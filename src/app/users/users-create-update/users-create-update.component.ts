import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { AlertService } from '../../alerts/alert.service';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Component({
  selector: 'app-users-create-update',
  templateUrl: './users-create-update.component.html',
  styleUrls: ['./users-create-update.component.css'],
})
export class UsersCreateUpdateComponent implements OnInit {

  form: FormGroup;
  id: string;
  isAddMode: boolean;
  submitted = false;
  savingUser = false;
  userLoaded = true;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      comments: new FormControl(),
    });

    if (!this.isAddMode) {
      this.userLoaded = false;
      this.userService.getById(this.id)
        .subscribe(user => {
          this.userLoaded = true;
          this.form.patchValue(user);
        });
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.savingUser = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  private updateUser() {
    this.userService.update(this.id, this.form.value)
      .subscribe({
        next: () => {
          this.alertService.success('User updated', { keepAfterRouteChange: true });
          this.router.navigateByUrl('/users');
        },
        error: (error) => {
          this.alertService.error(error);
          this.savingUser = false;
        },
      });
  }

  private createUser() {
    this.userService.create(this.form.value)
      .subscribe({
        next: () => {
          this.alertService.success('User added', { keepAfterRouteChange: true });
          this.router.navigateByUrl('/users');
        },
        error: error => {
          this.alertService.error(error);
          this.savingUser = false;
        },
      });
  }

}
