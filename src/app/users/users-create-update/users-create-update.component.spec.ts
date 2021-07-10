import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCreateUpdateComponent } from './users-create-update.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from '../service/user.service';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('UsersCreateUpdateComponent', () => {
  let component: UsersCreateUpdateComponent;
  let fixture: ComponentFixture<UsersCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes([])],
      declarations: [UsersCreateUpdateComponent],
      providers: [UserService, HttpClient],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
