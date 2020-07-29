import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetailComponent} from './detail/detail.component';
import {SiteLayoutComponent} from './layout/site-layout/site-layout.component'
import {HomeComponent} from './home/home.component'
import {DeathlistComponent} from './deathlist/deathlist.component'
import {ContactusComponent} from './contactus/contactus.component'
import {CondolenceComponent} from './condolence/condolence.component'
import {EmailalertComponent} from './emailalert/emailalert.component'
import {LandComponent} from './land/land.component'
import {NoticeComponent} from './notice/notice.component'
import {SearchesComponent} from './searches/searches.component'
const routes: Routes = [
  { path: '', 
    component: SiteLayoutComponent,
    children: [
      { path: '', component: HomeComponent},
      { path: 'home', component: HomeComponent},
      { path: 'deathnotices', component: DeathlistComponent},
      { path: 'deathnotices/condolence/:id', component: CondolenceComponent},
      { path: 'deathnotices/notice', component: NoticeComponent},
      { path: 'deathnotices/:name/:id', component: DetailComponent },
      { path: 'contact-us', component: ContactusComponent },
      { path: 'email-alert', component: EmailalertComponent },
      { path: 'searches', component: SearchesComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
