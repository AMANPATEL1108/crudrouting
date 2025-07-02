import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { User, UserService } from '../../services/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.css'],
})
export class UserFormComponent implements OnInit {
  user: User = {
    uid: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: 'Maharashtra', // Default value
    country: 'India', // Default value
    dob: '',
    userName: '',
    password: '',
  };

  isEdit = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const found = this.userService.getUserById(id);
      if (found) {
        this.user = found;
        this.isEdit = true;
      }
    }
  }

  saveUser() {
    if (this.isEdit) {
      this.userService.saveUser(this.user);
    } else {
      this.user.uid = uuidv4();
      this.userService.saveUser(this.user);
    }
    this.router.navigate(['/']);
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
