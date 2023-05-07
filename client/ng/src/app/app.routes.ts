import { Routes } from '@angular/router';
import { LoginComponent } from '@components/login/login.component';
import { AdvisesComponent } from '@components/advises/advises.component';
import { ContributeComponent } from '@components/contribute/contribute.component';
import { Error404Component } from '@components/error404/error404.component';
import { ListComponent } from '@components/list/list.component';
import { MoreComponent } from '@components/more/more.component';
import { SlideshowComponent } from '@components/slideshow/slideshow.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: SlideshowComponent
    },
    {
        path: 'list',
        component: ListComponent
    },
    {
        path: 'advises',
        component: AdvisesComponent
    },
    {
        path: 'more',
        component: MoreComponent
    },
    {
        path: 'contribute',
        component: ContributeComponent
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'admin',
        loadChildren: () => import('./components/admin/admin.routes').then(m => m.routes),                             
    },
    {
        path: '**',
        component: Error404Component
    },
];
