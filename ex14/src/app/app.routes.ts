import { Routes } from '@angular/router';
import { AppShellComponent } from './layout/app-shell/app-shell.component';
import { ListComponent } from './features/pokedex/list/list.component';
import { LoginComponent } from './features/auth/login/login.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },

    {
        path: '',
        component: AppShellComponent,
        children: [
            { path: '', component: ListComponent },
        ]
    },
];
