import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersViewComponent } from './users/users-view/users-view.component';
import { UsersCreateUpdateComponent } from './users/users-create-update/users-create-update.component';
import { GroupsListComponent } from './groups/groups-list/groups-list.component';
import { GroupsViewComponent } from './groups/groups-view/groups-view.component';
import { GroupsCreateUpdateComponent } from './groups/groups-create-update/groups-create-update.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersListComponent },
  { path: 'users/view/:id', component: UsersViewComponent },
  { path: 'users/edit/:id', component: UsersCreateUpdateComponent },
  { path: 'users/new', component: UsersCreateUpdateComponent },
  { path: 'groups', component: GroupsListComponent },
  { path: 'groups/view/:id', component: GroupsViewComponent },
  { path: 'groups/edit/:id', component: GroupsCreateUpdateComponent },
  { path: 'groups/new', component: GroupsCreateUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
