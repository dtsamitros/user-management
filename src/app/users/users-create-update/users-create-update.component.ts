import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { AlertService } from '../../alerts/alert.service';
import { GroupService } from '../../groups/service/group.service';
import { forkJoin, of } from 'rxjs';
import { User } from '../model/user.model';
import { Group } from '../../groups/model/group.model';
import { Location } from '@angular/common';

const atLeastOneCheckedBoxValidator = (control: AbstractControl) => {
  const formArray = control as FormArray;
  const noGroup = !formArray.controls.some((control) => (control as FormControl).value);
  return noGroup ? { noGroup } : null;
};

@Component({
  selector: 'app-users-create-update',
  templateUrl: './users-create-update.component.html',
  styleUrls: ['./users-create-update.component.css'],
})
export class UsersCreateUpdateComponent implements OnInit {

  form: FormGroup;
  id: string;
  groups: Group[] = [];

  isAddMode: boolean;
  submitted = false;
  savingUser = false;
  formLoaded = false;

  constructor(
    private userService: UserService,
    private groupService: GroupService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      comments: new FormControl(),
      groupCheckBoxes: new FormArray([], atLeastOneCheckedBoxValidator),
    });

    forkJoin({
      user: this.isAddMode ? of(new User()) : this.userService.getById(this.id),
      groups: this.groupService.getAll(),
    }).subscribe(({ user, groups }) => {
      this.formLoaded = true;
      this.form.patchValue(user);

      // add the group checkboxes
      this.groups = groups;
      groups.forEach(group => {
        const checked = user.groupIds.includes(group.id);
        (this.form.get('groupCheckBoxes') as FormArray).push(new FormControl(checked));
      });
    });
  }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }

    // get the group ids from the groupCheckBoxes controls
    const groupIds: number[] = [];
    this.form.value['groupCheckBoxes'].forEach((checked: boolean, index: number) => {
      if (checked) {
        groupIds.push(this.groups[index].id);
      }
    });
    const formValue: any = { ...this.form.value, groupIds };

    this.savingUser = true;
    if (this.isAddMode) {
      this.createUser(formValue);
    } else {
      this.updateUser(formValue);
    }
  }

  private updateUser(formValue: any) {
    this.userService.update(this.id, formValue)
      .subscribe({
        next: () => {
          this.alertService.success('User updated', { keepAfterRouteChange: true });
          this.location.back();
        },
        error: (error) => {
          this.alertService.error(error);
          this.savingUser = false;
        },
      });
  }

  private createUser(formValue: any) {
    this.userService.create(formValue)
      .subscribe({
        next: () => {
          this.alertService.success('User added', { keepAfterRouteChange: true });
          this.location.back();
        },
        error: error => {
          this.alertService.error(error);
          this.savingUser = false;
        },
      });
  }

  get groupControls(): FormControl[] {
    return this.form && (this.form.get('groupCheckBoxes') as FormArray).controls as FormControl[];
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
