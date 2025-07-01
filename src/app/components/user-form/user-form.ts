import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { User, UserService } from '../../services/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
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
    state: '',
    country: '',
    dob: '',
    userName: '',
    password: '',
  };

  isEdit = false;
  states = ['State 1', 'State 2', 'State 3'];
  countries = ['Country 1', 'Country 2', 'Country 3'];

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
