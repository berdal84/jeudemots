import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodayComponent } from './today/today.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: TodayComponent
    },
    {
        path: 'presentation',
        component: HomeComponent
    },
    {
        path: 'today',
        component: TodayComponent
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