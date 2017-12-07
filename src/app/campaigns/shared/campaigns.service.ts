import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth.service';
import { AuthHttp } from 'angular2-jwt';

import { GlobalVariable } from '../../config';

@Injectable()
export class CampaignsService {

    baseApiUrl = GlobalVariable.BACK_END_URL;
    constructor(private http: Http,
         private auth: AuthService,
         private authHttp: AuthHttp) {}

         // mano funkcija
//   updateProfile(profile: any)
getCampaigns(status: string): Observable<any> {
  return this.authHttp.get(this.baseApiUrl + '/campaign/list/' + status).map(
    (response: Response) => {
      return response.json();
    }
  );
}
// getModerateCampaign():Observable<any>{
//   return this.authHttp.get(this.baseApiUrl + '/campaign/list/moderation').map(
//     (response: Response) => {
//       return response.json();
//     }
//   )
// }
// getActiveCampaign():Observable<any>{
//   return this.authHttp.get(this.baseApiUrl + '/campaign/list/active').map(
//     (response: Response) => {
//       return response.json();
//     }
//   )
// }
// getFinishedCampaign():Observable<any>{
//   return this.authHttp.get(this.baseApiUrl + '/campaign/list/finished').map(
//     (response: Response) => {
//       return response.json();
//     }
//   )
// }
// getArchivedCampaign():Observable<any>{
//   return this.authHttp.get(this.baseApiUrl + '/campaign/list/archived').map(
//     (response: Response) => {
//       return response.json();
//     }
//   )
// }

  createCampaign() {
        return this.authHttp.post(this.baseApiUrl + '/campaign/add/',
          '', { headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})},
        ).map(
          (response: Response) => {
            return response.json();
          }
        );
      }

      getCampaign(id): Observable<any> {
          return this.authHttp.get(this.baseApiUrl + '/campaign/view/' + id).map((response: Response) => {
              return response.json();
          }
        );
      }
      // gauti media failus
      getMedia(id: number): Observable<any> {
        return this.authHttp.get(this.baseApiUrl + '/asset/upload/' + id).map((response: Response) => {
            return response.json();
        }
        // } backendurl+'/uploads/campaigns/'+editCampaignID+'/' + value.filename
      );
    }


      updateCampaignDetails(campaign: any, id: number) {
        let formData: FormData = new FormData();
        formData.append('title', campaign.title);

        formData.append('datefrom', campaign.datefrom.year + '-' + campaign.datefrom.month + '-' + campaign.datefrom.day);

        formData.append('dateto', campaign.dateto.year + '-' + campaign.dateto.month + '-' + campaign.dateto.day);

        return this.authHttp.post(this.baseApiUrl + '/campaign/edit/' + id,
        formData, { headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})}, ).map(
            (response: Response) => {
              return response.json();
            }
          );
      }

      deleteCampaign(id: number) {
        return this.authHttp.delete(this.baseApiUrl + '/campaign/remove/' + id,
        { headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})},
      ).map(
        (response: Response) => {
          return response.json();
        }
      );
      }
      dublicateCampaign(id: number) {
        return this.authHttp.get(this.baseApiUrl + '/campaign/copy/' + id, { headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})},
      ).map(
        (response: Response) => {
          return response.json();
        }
      );
      }
      moderateCampaign(id: number) {
        return this.authHttp.get(this.baseApiUrl + '/campaign/status/' + id + '/1',
        { headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})},
      ).map(
        (response: Response) => {
          return response.json();
        }
      );
      }
      stopCampaign(id: number) {
        return this.authHttp.get(this.baseApiUrl + '/campaign/status/' + id + '/0',
        { headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})},
      ).map(
        (response: Response) => {
          return response.json();
        }
      );
      }
    }
    // GET /campaign/copy/: campaign_id
