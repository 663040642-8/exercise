import { AuthService } from '../../../core/services/auth.service';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, SidebarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  authService = inject(AuthService);
  router = inject(Router);

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  Login() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.login(username!, password!).subscribe({
      next: (res: any) => {
        this.authService.loginResponse(res);
        this.router.navigate(['']);
      },
      error: (err: any) => {
        console.error(err);
      },
      complete: () => {
        console.log('login complete');
      }
    });
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}

