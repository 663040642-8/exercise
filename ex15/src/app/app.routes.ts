import { Routes } from '@angular/router';
import { AppShellComponent } from './layout/app-shell/app-shell.component';
import { ListComponent } from './features/pokedex/list/list.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { ProfileComponent } from './features/profile/profile.component';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
    {
        path: '',
        component: AppShellComponent,
        children: [
            { path: '', component: ListComponent },
            { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
            { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
        ]
    },

    { path: '**', redirectTo: '' }
];
