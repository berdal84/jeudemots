import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TodayComponent } from './components/today/today.component';
import { ListComponent } from './components/list/list.component';
import { AdvisesComponent } from './components/advises/advises.component';
import { MoreComponent } from './components/more/more.component';

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
        component: ListComponent
    },
    {
        path: 'advises',
        component: AdvisesComponent
    },
    {
        path: 'more',
        component: MoreComponent
    }
];