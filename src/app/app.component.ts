import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './auth.service';
import {MediaMatcher} from '@angular/cdk/layout';
import { TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  selected = "en";
  profile: any;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(public auth: AuthService,
    changeDetectorRef: ChangeDetectorRef,
     media: MediaMatcher,
     private translate: TranslateService) {
    auth.handleAuthentication();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    if(localStorage.getItem('lang')) {
      this.selected = localStorage.getItem('lang');
      translate.setDefaultLang(this.selected);
    }
  }
  langChange(select) {
    localStorage.setItem('lang', select);
    this.translate.use(select);
  }

  ngOnInit() {
    var data =  this.auth.profileChange.subscribe(profile => this.profile = profile);
    if(data){
      this.auth.getProfile();
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}

