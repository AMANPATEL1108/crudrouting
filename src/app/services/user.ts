import { Injectable } from '@angular/core';

export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city?: string;
  state?: string;
  country?: string;
  dob?: string;
  userName?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private localKey = 'users';

  getUsers(): User[] {
    const data = localStorage.getItem(this.localKey);
    return data ? JSON.parse(data) : [];
  }

  saveUser(user: User) {
    const users = this.getUsers();
    const existingIndex = users.findIndex((u) => u.uid === user.uid);

    if (existingIndex !== -1) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }

    localStorage.setItem(this.localKey, JSON.stringify(users));
  }

  deleteUser(uid: string) {
    const users = this.getUsers().filter((u) => u.uid !== uid);
    localStorage.setItem(this.localKey, JSON.stringify(users));
  }

  getUserById(uid: string): User | undefined {
    return this.getUsers().find((u) => u.uid === uid);
  }
}
