import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { GroupsCreateUpdateComponent } from './groups-create-update.component';
import { GroupService } from '../service/group.service';

describe('GroupsCreateUpdateComponent', () => {
  let component: GroupsCreateUpdateComponent;
  let fixture: ComponentFixture<GroupsCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes([])],
      declarations: [GroupsCreateUpdateComponent],
      providers: [GroupService, HttpClient],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
