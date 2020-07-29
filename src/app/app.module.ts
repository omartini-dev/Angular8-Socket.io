import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {DeathService} from "./Death.Service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxUiLoaderModule } from  'ngx-ui-loader';

import { AgmCoreModule } from '@agm/core';
import { DeathlistComponent } from './deathlist/deathlist.component';
import { SearchboxComponent } from './layout/searchbox/searchbox.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContactusComponent } from './contactus/contactus.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChurchComponent } from './church/church.component';
import { CemeteryComponent } from './cemetery/cemetery.component';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule ,MatCardModule,MatDialogModule,MatFormFieldModule} from '@angular/material';
import { FilterComponent } from './filter/filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CondolenceComponent } from './condolence/condolence.component';
import { EmailalertComponent } from './emailalert/emailalert.component';
import { LandComponent } from './land/land.component';
import { NoticeComponent } from './notice/notice.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SearchesComponent } from './searches/searches.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    HeaderComponent,
    FooterComponent,
    SiteLayoutComponent,
    HomeComponent,
    DeathlistComponent,
    SearchboxComponent,
    ContactusComponent,
    ChurchComponent,
    CemeteryComponent,
    FilterComponent,
    CondolenceComponent,
    EmailalertComponent,
    LandComponent,
    NoticeComponent,
    SearchesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    AngularFontAwesomeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDxTep_V7HKQsp5-LFbJnxeADY3cp2eK80'
    }),
    SocketIoModule.forRoot(config),
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    EditorModule,
    NgxUiLoaderModule
  ],
  providers: [
    DeathService

  ],
  bootstrap: [AppComponent],
  entryComponents:[FilterComponent]
})
export class AppModule { }
