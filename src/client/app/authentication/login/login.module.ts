import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LoginService } from '../../shared/login/index';

@NgModule({
  imports: [CommonModule, FormsModule, LoginRoutingModule, SharedModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [LoginService]
})
export class LoginModule { }
