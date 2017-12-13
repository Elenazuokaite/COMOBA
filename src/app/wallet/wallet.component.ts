import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Wallet } from './shared/wallet';
import { Transaction } from './shared/transaction';
import { WalletService } from './shared/wallet.service';
import { AuthService } from '../auth.service';
import {FormBuilder, FormGroup, Validators, FormsModule} from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  displayedColumns = ['createdAt', 'status', 'type', 'amount'];
  dataSource = new MatTableDataSource();
  form: FormGroup;

    profile: any;

    transaction: Transaction = new Transaction();

    wallet: Wallet = new Wallet();
  constructor(public auth: AuthService,
    private walletService: WalletService,
    private formBuilder: FormBuilder,
    private router: Router) {
      this.form = formBuilder.group ({
        amount: ['']
      });
     }

     ngOnInit() {
      this.walletService.getTopUp().subscribe(
        wallet => { this.wallet = wallet; }
      );

      this.walletService.getTransaction().subscribe(
        transaction => { this.transaction = transaction; this.dataSource = new MatTableDataSource(transaction);
          console.log(transaction);
        }
      );

     }

    onSave() {
      let wallet = this.form.value;
      let result;
      this.walletService.addTopUp(wallet).subscribe(
        result => { console.log(result); }
      );
      console.log(result);
    }
    // ngOnInit() {
    //   this.campaignsService.createCampaign().subscribe(
    //     campaign => {this.campaign = campaign;
    //     this.router.navigate(['/campaigns/view/', this.campaign.id]); },
    //     (error: Response) => console.log(error)
    //   );
    // }

}