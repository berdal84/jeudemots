import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AdminComponent } from "./admin.component";
import { AdminGuard } from "./admin.guard";
import { BackupComponent } from './backup/backup.component';
import { RestoreComponent } from './restore/restore.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InstallComponent } from "./install/install.component";
import { UninstallComponent } from "./uninstall/uninstall.component";

export const ROUTES: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: '',
                component: LoginComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [AdminGuard],
                canActivateChild: [AdminGuard],
                children: [
                    {
                        path: 'backup',
                        component: BackupComponent
                    },
                    {
                        path: 'restore',
                        component: RestoreComponent
                    },
                    {
                        path: 'install',
                        component: InstallComponent
                    },
                    {
                        path: 'uninstall',
                        component: UninstallComponent
                    }
                ]
            }           
        ]
    }];