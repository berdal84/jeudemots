import { Routes } from '@angular/router';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { ListComponent } from './components/list/list.component';
import { AdvisesComponent } from './components/advises/advises.component';
import { MoreComponent } from './components/more/more.component';
import { Error404Component } from './components/error404/error404.component';
import { ContributeComponent } from './components/contribute/contribute.component';

export const ROUTES: Routes = [
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
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: Error404Component
    },
];
