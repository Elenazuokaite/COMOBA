import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  template: '',
})
export class AuthComponent  {

  constructor(public auth: AuthService, public router: Router) {
   if (!auth.isAuthenticated()) {
     auth.login();
   } else {
     this.router.navigate(['/']);
   }
  }

}
