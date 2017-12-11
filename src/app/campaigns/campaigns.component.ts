import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Campaign } from './shared/campaign';
import { CampaignsService } from './shared/campaigns.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
// import { Response } from '_debugger';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})

export class CampaignsComponent implements OnInit {

  campaigns: Campaign[] = [];
  title = '';
  // lenteles atvaizdavimui
  displayedColumns = ['id', 'title', 'datefrom', 'dateto', 'actions'];
  dataSource = new MatTableDataSource();
  // lenteles rusiavimui
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private campaignsService: CampaignsService, ) { }


    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }

  ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
          var status = params['status'];
          if (!status) {
              this.router.navigate(['/']);
              return;
          }

          this.title = status + ' Campaigns';
          this.campaignsService.getCampaigns(status).subscribe(
            campaigns => { this.campaigns = campaigns; this.dataSource = new MatTableDataSource(campaigns); 
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator; },
             (error: Response) => console.log(error));
      });
      }
        dublicate(id) {
          this.campaignsService.dublicateCampaign(id).subscribe(
            campaign => {
               return this.router.navigate(['campaigns/view/' + campaign.id]); },
        (error: Response) => console.log(error));
        }
        edit(id) {
          this.router.navigate(['campaigns/view/' + id]);
        }

        removeCampaign(campaign) {
          if (confirm('Are you sure you want to delete ' + campaign.title + '?')) {
              const index = this.campaigns.indexOf(campaign);
              this.campaigns.splice(index, 1);
                this.campaignsService.deleteCampaign(campaign.id)
                  .subscribe(null,
                      error => {
                          alert('Could not delete campaign.');
                          this.campaigns.splice(index, 0, campaign);
                      });
          }
      }
}


