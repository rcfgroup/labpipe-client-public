import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FreshStartupComponent} from './components/startup-module/fresh-startup/fresh-startup.component';
import {SettingPortalComponent} from './components/setting-module/setting-portal/setting-portal.component';
import {PrepareLaunchComponent} from './components/startup-module/prepare-launch/prepare-launch.component';
import {TaskPortalComponent} from './components/portal-module/task-portal/task-portal.component';
import {LoginPageComponent} from './components/authentication-module/login-page/login-page.component';
import {DynamicFormWizardComponent} from './components/dynamic-form-module/dynamic-form-wizard/dynamic-form-wizard.component';
import {ManagePortalComponent} from './components/portal-module/manage-portal/manage-portal.component';

const routes: Routes = [
  {path: '', redirectTo: 'fresh-startup', pathMatch: 'full'},
  {path: 'fresh-startup', component: FreshStartupComponent},
  {path: 'settings', component: SettingPortalComponent},
  {path: 'prepare-launch', component: PrepareLaunchComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'tasks', component: TaskPortalComponent},
  {path: 'manage', component: ManagePortalComponent},
  {path: 'dynamic-form-wizard', component: DynamicFormWizardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
