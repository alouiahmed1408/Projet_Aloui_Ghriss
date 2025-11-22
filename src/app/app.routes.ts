import { Routes } from '@angular/router';
import { ListeRepas } from './component/liste-repas/liste-repas';
import { ListeClients } from './component/liste-clients/liste-clients';
import { Home } from './component/home/home';
import { Error404 } from './component/error404/error404';
import { LogIn } from './component/log-in/log-in';
import { SignIn } from './component/sign-in/sign-in';
import {  ProfileClientComponent } from './component/profile-client/profile-client';
import { adminGuardGuard } from './guards/admin-guard-guard';
import { clientGuardGuard } from './guards/client-guard-guard';
import { SelectedRepas } from './component/selected-repas/selected-repas';
import { EditRepas } from './component/edit-repas/edit-repas';
import { AddNewRepas } from './component/add-new-repas/add-new-repas';


export const routes: Routes = [
    { path: 'home', title: 'Accueil', component: Home },
    { path: 'log-in', title: 'Connexion', component: LogIn },
    { path: 'sign-in', title: 'Inscription', component: SignIn },
    { path: 'repas', title: 'Repas', component: ListeRepas },
    { path: 'repas/:idP', component: SelectedRepas },
    { path: 'repas/edit-repas/:id', component: EditRepas },
    
    {
        path: 'admin',
        canActivate: [adminGuardGuard],
        children: [
            { path: 'clients', title: 'Admin - Clients', component: ListeClients },
            { path: 'add-new-repas', component: AddNewRepas },
            { path: '', redirectTo: 'repas', pathMatch: 'full' }
        ]
    },

    {
        path: 'client',
        canActivate: [clientGuardGuard],
        children: [
            { path: 'profile', title: 'Mon Profil', component: ProfileClientComponent }, 
            { path: '', redirectTo: 'profile', pathMatch: 'full' }
        ]
    },

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: Error404 },
];
