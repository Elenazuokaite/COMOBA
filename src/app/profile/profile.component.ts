import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormsModule} from '@angular/forms';
import { Router } from '@angular/router';


import { User } from './shared/User';
import { UserService } from './shared/user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;

  profile: any;

  user: User = new User();

    constructor(
      public auth: AuthService,
      private userService: UserService,
      private formBuilder: FormBuilder,
      private router: Router) {
        this.form = formBuilder.group ({
          company: [''],
          vat: [''],
          address: [''],
          code: ['']
        });
     }

    ngOnInit() {
      if (this.auth.userProfile) {
        this.profile = this.auth.userProfile;
      } else {
        this.auth.getProfile((err, profile) => {
          this.profile = profile;
        });
      }
      this.userService.getProfile().subscribe(
      user => this.user = user,
      (error: Response) => console.log(error)
    );
    }

    onSave() {
      let user = this.form.value;
      let result;
      this.userService.updateProfile(user).subscribe(
        result => { this.router.navigate(['/profile']); }
      );
      console.log(result);
    }
  }



