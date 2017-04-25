import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LoginService } from '../../shared/login/index';

@NgModule({
  imports: [CommonModule, ProfileRoutingModule, SharedModule],
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
  providers: [LoginService]
})
export class ProfileModule { }
