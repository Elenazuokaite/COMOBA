import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth.service';
import { AuthHttp } from 'angular2-jwt';

import { GlobalVariable } from '../../config';

@Injectable()
export class WalletService{

    baseApiUrl = GlobalVariable.BACK_END_URL;
    constructor(private http: Http, private auth: AuthService, private authHttp: AuthHttp) {}


     getTopUp(): Observable<any> {
        const token = this.auth.getToken();
        return this.authHttp.get(this.baseApiUrl + '/user/wallet/view')
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
          }

         addTopUp(topUp: any) {

            let formData: FormData = new FormData();
            formData.append('form_amount', topUp.amount);
            formData.append('form_redirect_url', '/wallet');
            return this.authHttp.post(this.baseApiUrl + '/user/wallet/topup',
            formData, { headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})},
            ).map(
              (response: Response) => {
                return response.json();
              }
            );
          }
        }
        // POST /user/wallet/topup [FORM DATA: form_amount=INTEGER_NUMBER&form_redirect_url=FRONTEND_REDIRECT_URL_HARDCODED]