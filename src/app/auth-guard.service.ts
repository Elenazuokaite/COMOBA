import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.auth.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['/auth']);
            return false;
        }
    }
}