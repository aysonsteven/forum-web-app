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
import { ForumHomePage } from '../pages/forumpages/forumhome/forumhome';



@NgModule({
  declarations: [
    LoginPage,
    RegistrationPage,
    ForumHomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BaseModule,
    FormsModule,
    ForumRoutingModule
  ],

  providers: [ UserService, PostService ]
})
export class ForumModule {}


