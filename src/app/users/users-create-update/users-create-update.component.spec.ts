import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersCreateUpdateComponent } from './users-create-update.component';
import { UserService } from '../service/user.service';
import { GroupService } from '../../groups/service/group.service';

describe('UsersCreateUpdateComponent', () => {
  let component: UsersCreateUpdateComponent;
  let fixture: ComponentFixture<UsersCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes([])],
      declarations: [UsersCreateUpdateComponent],
      providers: [UserService, GroupService, HttpClient],
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
