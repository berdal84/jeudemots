import { Routes } from '@angular/router';
import { BackupComponent } from './backup/backup.component';
import { InstallComponent } from './install/install.component';
import { RestoreComponent } from './restore/restore.component';
import { UninstallComponent } from './uninstall/uninstall.component';
import { isLogged } from 'src/app/guards/is-logged.guard';
import { AdminComponent } from './admin.component';

export const routes: Routes = [{
    path: '',
    component: AdminComponent,
    canActivate: [isLogged],
    canActivateChild: [isLogged],  
    children: [
        {
            path: 'backup',
            component: BackupComponent,
        },
        {
            path: 'restore',
            component: RestoreComponent,
        },
        {
            path: 'install',
            component: InstallComponent,
        },
        {
            path: 'uninstall',
            component: UninstallComponent,
        }
    ]
}];