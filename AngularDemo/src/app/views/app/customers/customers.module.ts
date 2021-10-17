import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutContainersModule} from '../../../containers/layout/layout.containers.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {FormsModule} from '@angular/forms';
import {ComponentsStateButtonModule} from '../../../components/state-button/components.state-button.module';
import {PagesContainersModule} from '../../../containers/pages/pages.containers.module';
import {ModalModule} from 'ngx-bootstrap/modal';
import {NgxSpinnerModule} from 'ngx-spinner';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {NgSelectModule} from '@ng-select/ng-select';
import {DropzoneModule} from 'ngx-dropzone-wrapper';
import { CustomersService } from './customers.service';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';



@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CustomersRoutingModule,
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
    DropzoneModule
  ],
providers:[CustomersService]
})
export class CustomersModule { }
