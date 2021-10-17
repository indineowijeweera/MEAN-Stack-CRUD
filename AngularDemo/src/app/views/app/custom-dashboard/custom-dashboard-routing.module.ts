import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomDashboardComponent} from './custom-dashboard.component';



const routes: Routes = [
  {
    path: '', component: CustomDashboardComponent,
    // children: [
    //   { path: '', pathMatch: 'full', redirectTo: 'allUsers' },
    //   { path: 'allUsers',  component: AllUsersComponent },
    // ]
  }
];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomDashboardRoutingModule { }

