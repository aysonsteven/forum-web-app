import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BaseModule } from '../pages/base/base.module';
import { ForumRoutingModule } from '../app/forum-routes.module'

import { UserService } from '../services/user.service';
import { PostService } from '../services/post.service';

import { LoginPage } from '../pages/authentication/login/login.component';
import { RegistrationPage } from '../pages/authentication/registration/registration.component';



@NgModule({
  declarations: [
    LoginPage,
    RegistrationPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BaseModule,
    FormsModule,
    ForumModule
  ],

  providers: [ UserService, PostService ]
})
export class ForumModule {}


