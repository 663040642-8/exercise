import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firstName = signal<string | null>(localStorage.getItem('firstName'));
  lastName = signal<string | null>(localStorage.getItem('lastName'));
  image = signal<string | null>(localStorage.getItem('image'));
  token = signal<string | null>(localStorage.getItem('token'));
  http = inject(HttpClient);
  router = inject(Router);

  login(username: string, password: string) {
    const apiUrl = `https://dummyjson.com/auth/login`;
    return this.http.post<any>(apiUrl, {
      username,
      password
    });
  }

  loginResponse(res: any) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('firstName', res.firstName);
    localStorage.setItem('lastName', res.lastName);
    localStorage.setItem('image', res.image);
    this.token.set(res.token);
    this.firstName.set(res.firstName);
    this.lastName.set(res.lastName);
    this.image.set(res.image);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }

  getImage() {
    return this.image;
  }

  getToken() {
    return this.token;
  }
}
