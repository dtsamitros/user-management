import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './users/service/user.service';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersViewComponent } from './users/users-view/users-view.component';
import { UsersCreateUpdateComponent } from './users/users-create-update/users-create-update.component';
import { AlertService } from './alerts/alert.service';
import { AlertComponent } from './alerts/alert.component';
import { GroupService } from './groups/service/group.service';
import { GroupsListComponent } from './groups/groups-list/groups-list.component';
import { GroupsCreateUpdateComponent } from './groups/groups-create-update/groups-create-update.component';
import { GroupsViewComponent } from './groups/groups-view/groups-view.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    UsersListComponent,
    UsersViewComponent,
    UsersCreateUpdateComponent,
    GroupsListComponent,
    GroupsCreateUpdateComponent,
    GroupsViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    UserService,
    GroupService,
    AlertService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
