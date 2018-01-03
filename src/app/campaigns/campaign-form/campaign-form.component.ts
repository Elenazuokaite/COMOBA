import { Component, OnInit } from '@angular/core';
import { Campaign} from '../shared/campaign';
import { Media} from '../shared/media';
import { CampaignsService } from '../shared/campaigns.service';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormsModule, FormControl} from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { GlobalVariable } from '../../config';
import { DatePipe } from '@angular/common';
import { ViewEncapsulation, ViewChild, Directive, Pipe, PipeTransform } from '@angular/core';

import { DayOfWeekComponent } from './day-of-week/day-of-week.component';
import { GpsComponent } from './gps/gps.component';
import { GroupComponent } from './group/group.component';
import { TimeComponent } from './time/time.component';

import { TargetsService } from '../shared/targets.service';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.scss'],
  providers: [DatePipe],
})
export class CampaignFormComponent implements OnInit {
targetSelected = "";
  someRange2config: any = {
    behaviour: 'drag',
    connect: true,
    margin: 1,
    limit:  24, 
    range: {
      min: 0,
      max: 24,
    },
    pips: {
      mode: 'count', 
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

  imageUploadUrl:string;
  myHeaders: { [name: string]: any } = {
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  };

  images = [];

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
     private formBuilder: FormBuilder,
     private datePipe: DatePipe,
    private targetsService:TargetsService, ) {
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
              this.imageUploadUrl = this.baseApiUrl + '/asset/upload/' + campaign.id;
          },
          response => {
              if (response.status === 404) {
                  this.router.navigate(['/']);
              }
          });

      this.campaignsService.getMedia(id).subscribe(
        media => {
            this.media = media;
            this.images = [];
            for (var i = 0; i < media.length; i++) {
              this.images.push({fileName: media[i].filename,
                url:  this.baseApiUrl+'/uploads/campaigns/'+media[i].campaignid+'/' + media[i].filename});
              }
            // console.log(media.filename);
        },
        response => {
            console.log(response);
            }
        );
  });

  }

  addTarget() {
    
       this.targetsService.createTarget(this.campaign.id, this.targetSelected).subscribe(
         result => {
           this.appendTarget(result);
           }
       );
     }
   
     appendTarget(target:any){
       if(target.type == "gps"){
         this.targetsService.appendComponentToBody(GpsComponent, target);
       }else if(target.type == "day" ){
         this.targetsService.appendComponentToBody(DayOfWeekComponent, target);
       }else if(target.type == "time"){
         this.targetsService.appendComponentToBody(TimeComponent, target);
       }else if(target.type == "group"){
         this.targetsService.appendComponentToBody(GroupComponent, target);
       }
     }

  onUploadFinished(file: any) {
    alert('uploaded!');
  }
  onRemoved(filename){
    this.campaignsService.removeImage(filename.file.name, this.campaign.id).subscribe(
      result => { return true }
   );
  }

  onSave() {
    let user = this.form.value;
    let result;
    let campaign = this.form.value;
    let id = this.campaign.id;
    campaign.datefrom = this.datePipe.transform(campaign.datefrom, 'yyyy-MM-dd');
    campaign.dateto = this.datePipe.transform(campaign.dateto, 'yyyy-MM-dd');
    console.log(campaign);
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

