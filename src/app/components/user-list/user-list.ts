  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { User, UserService } from '../../services/user';

  @Component({
    selector: 'app-user-list',
    templateUrl: './user-list.html',
    styleUrls: ['./user-list.css'],
  })
  export class UserListComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService, private router: Router) {}

    ngOnInit() {
      this.loadUsers();
    }

    loadUsers() {
      this.users = this.userService.getUsers();
    }

    deleteUser(uid: string) {
      if (confirm('Are you sure you want to delete this user?')) {
        this.userService.deleteUser(uid);
        this.loadUsers();
      }
    }

    editUser(uid: string) {
      this.router.navigate(['/edit', uid]);
    }

    addUser() {
      this.router.navigate(['/add']);
    }
  }
