import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from '../../services/user';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  userToDelete: string | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.userService.getUsers();
  }

  openDeleteModal(content: any, uid: string) {
    this.userToDelete = uid;
    this.modalService.open(content, {
      ariaLabelledBy: 'delete-modal-title',
      centered: true,
    });
  }

  confirmDelete() {
    if (this.userToDelete) {
      this.userService.deleteUser(this.userToDelete);
      this.loadUsers();
      this.modalService.dismissAll();
    }
  }

  editUser(uid: string) {
    this.router.navigate(['/edit', uid]);
  }

  addUser() {
    this.router.navigate(['/add']);
  }
}
