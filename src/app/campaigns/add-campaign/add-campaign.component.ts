import { Component, OnInit } from '@angular/core';
import { CampaignsService } from '../shared/campaigns.service';
import { Campaign } from '../shared/campaign';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.scss']
})
export class AddCampaignComponent implements OnInit {

    campaign: Campaign = new Campaign();

  constructor( private campaignsService: CampaignsService, private router: Router) { }

  ngOnInit() {
    this.campaignsService.createCampaign().subscribe(
      campaign => {this.campaign = campaign;
      this.router.navigate(['/campaigns/view/', this.campaign.id]); },
      (error: Response) => console.log(error)
    );
  }
}
