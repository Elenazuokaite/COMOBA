import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './auth.service';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(public auth: AuthService,
    changeDetectorRef: ChangeDetectorRef,
     media: MediaMatcher) {
    auth.handleAuthentication();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}

