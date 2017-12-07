import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { routing } from './app.routing';

import { HttpModule } from '@angular/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatProgressBarModule, MatListModule, MatMenuModule, MatIconModule, MatSidenavModule, MatToolbarModule, MatGridListModule, MatCardModule, MatTableModule, MatExpansionModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatSliderModule } from '@angular/material';

import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './profile/shared/user.service';
import { CampaignsService } from './campaigns/shared/campaigns.service';



import { AppComponent } from './app.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PageTitleBarComponent } from './page-title-bar/page-title-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsComponent } from './dashboard/charts/charts.component';
import { StatisticComponent } from './dashboard/statistic/statistic.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { AddCampaignComponent } from './campaigns/add-campaign/add-campaign.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthComponent } from './auth/auth.component';
import { CallbackComponent } from './callback/callback.component';

import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { CampaignFormComponent } from './campaigns/campaign-form/campaign-form.component';
import { NotificationsComponent } from './top-navbar/notifications/notifications.component';
import { DayOfWeekComponent } from './campaigns/campaign-form/day-of-week/day-of-week.component';
import { GpsComponent } from './campaigns/campaign-form/gps/gps.component';
import { GroupComponent } from './campaigns/campaign-form/group/group.component';
import { TimeComponent } from './campaigns/campaign-form/time/time.component';
import { WalletComponent } from './wallet/wallet.component';

// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token'))
  }), http, options);
}
// datos formatas
// export const MY_NATIVE_DATE_FORMATS = {
//   parse: {
//     dateInput: 'LL',
//   },
//   display: {
//     dateInput: 'LL',
//     monthYearLabel: 'YYYY MMMM',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'YYYY MMMM',
//   },
// };

@NgModule({
  declarations: [
    AppComponent,
    TopNavbarComponent,
    SidebarComponent,
    PageTitleBarComponent,
    DashboardComponent,
    ChartsComponent,
    StatisticComponent,
    CampaignsComponent,
    AddCampaignComponent,
    ProfileComponent,
    AuthComponent,
    CallbackComponent,
    CampaignFormComponent,
    NotificationsComponent,
    DayOfWeekComponent,
    GpsComponent,
    GroupComponent,
    TimeComponent,
    WalletComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    RouterModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatExpansionModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSliderModule
  ],
  providers: [ AppService, AuthService,
    AuthGuardService, UserService, CampaignsService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    // {provide: MAT_DATE_FORMATS, useValue: MY_NATIVE_DATE_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'lt-LT'},
    // {provide: DateAdapter, useClass: MyDateAdapter},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }





