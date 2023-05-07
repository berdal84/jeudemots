import { Routes } from '@angular/router';
import { isLogged } from './guards/is-logged.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./components/slideshow/slideshow.component').then(m => m.SlideshowComponent)
    },
    {
        path: 'list',
        loadComponent: () => import('./components/list/list.component').then(m => m.ListComponent)
    },
    {
        path: 'advises',
        loadComponent: () => import('./components/advises/advises.component').then(m => m.AdvisesComponent)
    },
    {
        path: 'more',
        loadComponent: () => import('./components/more/more.component').then(m => m.MoreComponent)
    },
    {
        path: 'contribute',
        loadComponent: () => import('./components/contribute/contribute.component').then(m => m.ContributeComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./components/admin/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./components/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [isLogged],
        canActivateChild: [isLogged],                                
        children: [
            {
                path: 'backup',
                loadComponent: () => import('./components/admin/backup/backup.component').then(m => m.BackupComponent),
            },
            {
                path: 'restore',
                loadComponent: () => import('./components/admin/restore/restore.component').then(m => m.RestoreComponent),
            },
            {
                path: 'install',
                loadComponent: () => import('./components/admin/install/install.component').then(m => m.InstallComponent),
            },
            {
                path: 'uninstall',
                loadComponent: () => import('./components/admin/uninstall/uninstall.component').then(m => m.UninstallComponent),
            }
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./components/error404/error404.component').then(m => m.Error404Component)
    },
];
