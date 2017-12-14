import { Component, OnInit } from '@angular/core';
import { Campaign} from '../shared/campaign';
import { Media} from '../shared/media';
import { CampaignsService } from '../shared/campaigns.service';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormsModule, FormControl} from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { GlobalVariable } from '../../config';
@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.scss']
})
export class CampaignFormComponent implements OnInit {

  someRange2config: any = {
    behaviour: 'drag',
    connect: true,
    margin: 1, //must be divisible by step
    limit:  24, //must be divisible by step
    range: {
      min: 0,
      max: 24,
    },
    pips: {
      mode: 'count', //there were too much pips to see anything
      values: 5,
      density: 4
    },
    step: 1,
  };
someRange: number|number[] =  [6,22];

  form: FormGroup;
  campaign: Campaign = new Campaign();
  media: Media = new Media();
  baseApiUrl = GlobalVariable.BACK_END_URL;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  minDate = new Date();
  maxDate = new Date(2018, 0, 30);
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
  // minDate2 = this.date.value;
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

