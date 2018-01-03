import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { routing } from './app.routing';

import { HttpModule } from '@angular/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MediaMatcher} from '@angular/cdk/layout';

import { FlexLayoutModule } from '@angular/flex-layout';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatProgressBarModule, MatListModule, MatMenuModule, MatIconModule, MatSidenavModule, MatToolbarModule, MatGridListModule, MatCardModule, MatTableModule, MatExpansionModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatSliderModule, MatSortModule, MatPaginatorModule } from '@angular/material';

import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './profile/shared/user.service';
import { CampaignsService } from './campaigns/shared/campaigns.service';
import { WalletService } from './wallet/shared/wallet.service';
import { TargetsService } from './campaigns/shared/targets.service';

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
// dropzone
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { ImageUploadModule } from "angular2-image-upload";
//translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
//snackbar
import {MatSnackBarModule} from '@angular/material/snack-bar';
//date pipe
import { DatePipe } from '@angular/common';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NouisliderModule } from 'ng2-nouislider';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token'))
  }), http, options);
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
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
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
   url: 'https://httpbin.org/post',
   maxFilesize: 50,
   acceptedFiles: 'image/*'
 };
 

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
  entryComponents: [
    GpsComponent,
    GroupComponent,
    TimeComponent,
    DayOfWeekComponent,
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
    MatSliderModule,
    MatSortModule,
    MatPaginatorModule,
    DropzoneModule,
    FlexLayoutModule,
    NouisliderModule,
    ImageUploadModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatSnackBarModule
  ],
  providers: [ AppService, AuthService,
    AuthGuardService, UserService, CampaignsService, WalletService,
    MediaMatcher, TargetsService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
    // {provide: MAT_DATE_FORMATS, useValue: MY_NATIVE_DATE_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'lt-LT'},
    // {provide: DateAdapter, useClass: MyDateAdapter},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }






