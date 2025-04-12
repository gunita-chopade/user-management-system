import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private localStorageKey = 'users';

  constructor() {}

  getUsers(): User[] {
    const users = localStorage.getItem(this.localStorageKey);
    return users ? JSON.parse(users) : [];
  }

  saveUsers(users: User[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }

  addUser(user: User): void {
    const users = this.getUsers();
    user.id = new Date().getTime(); // simple unique ID
    users.push(user);
    this.saveUsers(users);
  }

  updateUser(updatedUser: User): void {
    const users = this.getUsers().map(user =>
      user.id === updatedUser.id ? updatedUser : user
    );
    this.saveUsers(users);
  }

  deleteUser(id: number): void {
    const users = this.getUsers().filter(user => user.id !== id);
    this.saveUsers(users);
  }

  getUserById(id: number): User | undefined {
    return this.getUsers().find(user => user.id === id);
  }
}