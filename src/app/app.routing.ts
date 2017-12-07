import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { AddCampaignComponent } from './campaigns/add-campaign/add-campaign.component';
import { CallbackComponent } from './callback/callback.component';
import { AuthComponent } from './auth/auth.component';
import { CampaignFormComponent } from './campaigns/campaign-form/campaign-form.component';
import { WalletComponent } from './wallet/wallet.component';

import { AuthGuardService } from './auth-guard.service';

const APP_Routes: Routes = [
  { path: '', pathMatch:'full', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'dashboard', component: CallbackComponent },
  { path: 'auth', component: AuthComponent },

  { path: 'campaigns/view/:id', component: CampaignFormComponent, canActivate: [AuthGuardService] },
  { path: 'campaigns/list/:status', component: CampaignsComponent, canActivate: [AuthGuardService] },
  
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'wallet', component: WalletComponent, canActivate: [AuthGuardService] },

  { path: 'add-campaigns', component: AddCampaignComponent, canActivate: [AuthGuardService] }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_Routes);