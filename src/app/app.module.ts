import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './users/service/user.service';
import { UsersListComponent } from './users/users-list/users-list.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersViewComponent } from './users/users-view/users-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersCreateUpdateComponent } from './users/users-create-update/users-create-update.component';
import { AlertService } from './alerts/alert.service';
import { AlertComponent } from './alerts/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    UsersListComponent,
    UsersViewComponent,
    UsersCreateUpdateComponent,
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
    AlertService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
