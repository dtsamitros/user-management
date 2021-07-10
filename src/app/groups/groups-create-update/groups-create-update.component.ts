import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../service/group.service';
import { AlertService } from '../../alerts/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Group } from '../model/group.model';

@Component({
  selector: 'app-groups-create-update',
  templateUrl: './groups-create-update.component.html',
  styleUrls: ['./groups-create-update.component.css'],
})
export class GroupsCreateUpdateComponent implements OnInit {

  form: FormGroup;
  id: string;

  isAddMode: boolean;
  submitted = false;
  savingGroup = false;
  formLoaded = true;

  constructor(
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
      description: new FormControl(''),
    });

    if (!this.isAddMode) {
      this.formLoaded = false;
      this.groupService.getById(this.id).subscribe((group: Group) => {
        this.formLoaded = true;
        this.form.patchValue(group);
      });
    }
  }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }

    this.savingGroup = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  private updateUser() {
    this.groupService.update(this.id, this.form.value)
      .subscribe({
        next: () => {
          this.alertService.success('Group updated', { keepAfterRouteChange: true });
          this.location.back();
        },
        error: (error) => {
          this.alertService.error(error);
          this.savingGroup = false;
        },
      });
  }

  private createUser() {
    this.groupService.create(this.form.value)
      .subscribe({
        next: () => {
          this.alertService.success('Group added', { keepAfterRouteChange: true });
          this.location.back();
        },
        error: error => {
          this.alertService.error(error);
          this.savingGroup = false;
        },
      });
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
