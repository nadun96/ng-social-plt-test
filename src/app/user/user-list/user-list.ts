import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  imports: [AsyncPipe],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  private userService = inject(UserService);
  users$ = this.userService.getUsers().pipe(map(users => users.slice(0, 3)));
  refreshUsers() {
    // For demonstration, we just reassign the observable to simulate a refresh
    this.users$ = this.userService.getUsers().pipe(map(users => users.slice(0, 3)));
  }
}
