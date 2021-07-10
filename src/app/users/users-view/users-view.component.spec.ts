import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersViewComponent } from './users-view.component';
import { UserService } from '../service/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '../../alerts/alert.service';

describe('UsersViewComponent', () => {
  let component: UsersViewComponent;
  let fixture: ComponentFixture<UsersViewComponent>;

  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [HttpClientModule, RouterTestingModule.withRoutes([])],
        declarations: [UsersViewComponent],
        providers: [UserService, HttpClient, AlertService],
      },
    ).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.get(Router);
    route = TestBed.get(ActivatedRoute);

    fixture = TestBed.createComponent(UsersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(route.snapshot.paramMap, 'get').and.returnValue('1');

    expect(component).toBeTruthy();
  });
});
