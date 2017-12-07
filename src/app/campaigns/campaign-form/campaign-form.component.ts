import { Component, OnInit } from '@angular/core';
import { Campaign} from '../shared/campaign';
import { Media} from '../shared/media';
import { CampaignsService } from '../shared/campaigns.service';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormsModule} from '@angular/forms';

import { GlobalVariable } from '../../config';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.scss']
})
export class CampaignFormComponent implements OnInit {

  form: FormGroup;
  campaign: Campaign = new Campaign();
  media: Media = new Media();
  baseApiUrl = GlobalVariable.BACK_END_URL;

  config = {
    // Change this to your upload POST address:
     url: 'https://www.google.lt/',
     headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')},
     maxFilesize: 50,
     acceptedFiles: 'image/*'
   };

  constructor( private router: Router,
     private activatedRoute: ActivatedRoute,
     private campaignsService: CampaignsService,
     private formBuilder: FormBuilder, ) {
      this.form = formBuilder.group ({
        title: [''],
        dateto: [''],
        datefrom: [''],
        budget: ['']
      });
      }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      var id = params['id'];

      if (!id) {
          this.router.navigate(['/']);
          return;
      }
      this.campaignsService.getCampaign(id).subscribe(
          campaign => {
              this.campaign = campaign;
              this.config.url = this.baseApiUrl + '/asset/upload/' + campaign.id;
          },
          response => {
              if (response.status === 404) {
                  this.router.navigate(['/']);
              }
          });

      this.campaignsService.getMedia(id).subscribe(
        media => {
            this.media = media;
            // console.log(media.filename);
        },
        response => {
            console.log(response);
            }
        );
  });

  }

  onSave() {
    let user = this.form.value;
    let result;
    let campaign = this.form.value;
    let id = this.campaign.id;
    this.campaignsService.updateCampaignDetails(campaign, id).subscribe(
      result => { this.router.navigate(['/campaigns/view/', this.campaign.id]); }
    );
    console.log(result);
  }

  sendModeration(campaign) {
    this.campaignsService.moderateCampaign(campaign.id).subscribe( campaign => {
        return this.router.navigate(['campaigns/list/moderation']); },
    (error: Response) => console.log(error));
    }

    stopCampaign(campaign) {
      this.campaignsService.stopCampaign(campaign.id).subscribe( campaign => {
        return this.router.navigate(['campaigns/view/' + campaign.id ]); },
      (error: Response) => console.log(error));
      }

}

