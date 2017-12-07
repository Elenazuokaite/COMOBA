import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth.service';
import { AuthHttp } from 'angular2-jwt';

import { GlobalVariable } from '../../config';

@Injectable()
export class UserService{

    baseApiUrl = GlobalVariable.BACK_END_URL;
    constructor(private http: Http, private auth: AuthService, private authHttp: AuthHttp) {}


     getProfile(): Observable<any> {
        const token = this.auth.getToken();
        return this.authHttp.get(this.baseApiUrl + '/userprofile')
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
          }

         //mano funkcija
  updateProfile(profile: any){
    
        //Nesamoningas kelias i back-end, suformuojam suformuotus duomenis i js FormData
        //Tada juos siunciame i backend... Ateityje turetu pasikeisti
        let formData: FormData = new FormData();
        formData.append('form_company', profile.company);
        formData.append('form_address', profile.address);
        formData.append('form_code', profile.code);
        formData.append('form_vat', profile.vat);
    
        //si funkcija tures grazinti duomenis is backend
        return this.authHttp.post(this.baseApiUrl + '/userprofile',
          formData, { headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})},
        ).map(
          (response: Response) =>{
            return response.json();
          }
        );
      }

    // updateProfile(profile){
    //     //funkcija grazina duomenis is back-end
    //     return this.authHttp.post(this.baseApiUrl + 'userprofile', profile).map((response: Response) =>{
    //         return response.json();
    //     });
    // }
    // getToken() {
    //     return localStorage.getItem('id_token');
    // }
}