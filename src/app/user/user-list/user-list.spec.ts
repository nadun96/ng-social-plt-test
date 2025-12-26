import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { UserList } from './user-list';
import { UserService } from '../user.service';

describe('UserList', () => {
  let component: UserList;
  let fixture: ComponentFixture<UserList>;
  let userServiceSpy: { getUsers: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    userServiceSpy = {
      getUsers: vi.fn().mockReturnValue(
        of([
          { id: 1, name: 'Test User 1' },
          { id: 2, name: 'Test User 2' },
          { id: 3, name: 'Test User 3' },
        ])
      ),
    };
    await TestBed.configureTestingModule({
      imports: [UserList],
      providers: [{ provide: UserService, useValue: userServiceSpy }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserList);
    component = fixture.componentInstance;
    // await fixture.whenStable();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('calls getUsers once on init', () => {
    fixture.detectChanges();
    expect(userServiceSpy.getUsers).toHaveBeenCalledTimes(1);
  });

  it('should refresh users when refreshUsers is called', () => {
    fixture.detectChanges();
    userServiceSpy.getUsers.mockClear();
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(userServiceSpy.getUsers).toHaveBeenCalledTimes(1);
  });
});
