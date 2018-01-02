import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {
  profile: any;
  name: string;
    constructor(public auth: AuthService) { }

    ngOnInit() {
      var data =  this.auth.profileChange.subscribe(profile => this.profile = profile);
      if(data){
        this.auth.getProfile();
      }
      
    }
    logout() {
          this.auth.logout();
        }

  }



//   constructor(private auth: AuthService) { }

//   ngOnInit() {
//   }
//   logout() {
//     this.auth.logout();
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { User } from './shared/User';
// import { UserService } from './shared/user.service';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.scss']
// })
// export class ProfileComponent implements OnInit {
//   profile: any;
//     constructor(public auth: AuthService, private userService: UserService) { }
//     ngOnInit() {
//       if (this.auth.userProfile) {
//         this.profile = this.auth.userProfile;
//       } else {
//         this.auth.getProfile((err, profile) => {
//           this.profile = profile;
//         });
//       }
//     }
