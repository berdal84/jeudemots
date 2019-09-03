import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'presentation',
        component: HomeComponent
    },
    {
        path: 'today',
        component: HomeComponent
    },
    {
        path: 'list',
        component: HomeComponent
    },
    {
        path: 'advises',
        component: HomeComponent
    },
    {
        path: 'more',
        component: HomeComponent
    }
];