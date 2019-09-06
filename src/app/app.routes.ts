import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodayComponent } from './today/today.component';
import { ListComponent } from './list/list.component';
import { AdvisesComponent } from './advises/advises.component';
import { MoreComponent } from './more/more.component';

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