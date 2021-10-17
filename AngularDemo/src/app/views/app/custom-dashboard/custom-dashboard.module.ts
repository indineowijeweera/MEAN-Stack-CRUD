import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutContainersModule} from '../../../containers/layout/layout.containers.module';
import { CustomDashboardRoutingModule } from './custom-dashboard-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {FormsModule} from '@angular/forms';
import {ComponentsStateButtonModule} from '../../../components/state-button/components.state-button.module';
import {PagesContainersModule} from '../../../containers/pages/pages.containers.module';
import {ModalModule} from 'ngx-bootstrap/modal';
import {NgxSpinnerModule} from 'ngx-spinner';
import {CustomDashboardComponent} from './custom-dashboard.component';
import {CustomDashboardService} from './custom-dashboard.service';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {NgSelectModule} from '@ng-select/ng-select';
import {DropzoneModule} from 'ngx-dropzone-wrapper';
import {DashboardsContainersModule} from '../../../containers/dashboards/dashboards.containers.module';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import {ComponentsChartModule} from '../../../components/charts/components.charts.module';
import {SharedModule} from '../../../shared/shared.module';
import {ChartsModule} from 'ng2-charts';
import {AgmCoreModule} from '@agm/core';


@NgModule({
  declarations: [CustomDashboardComponent],
  imports: [
    CustomDashboardRoutingModule,
    CommonModule,
    LayoutContainersModule,
    SimpleNotificationsModule.forRoot(),
    NgxSpinnerModule,
    PagesContainersModule,
    NgxDatatableModule,
    FormsModule,
    ModalModule.forRoot(),
    ComponentsStateButtonModule,
    PaginationModule.forRoot(),
    NgSelectModule,
    DropzoneModule,
    DashboardsContainersModule,
    RoundProgressModule,
    ComponentsChartModule,
    SharedModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAru2aC-7naCQKYyMkZj-jmUzLwalmoGFA'
    })
  ],
providers:[CustomDashboardService]
})
export class CustomDashboardModule { }
