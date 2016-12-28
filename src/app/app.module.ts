import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ForumModule } from '../apps/forum/app/forum.module';

import { AppComponent } from './app.component';

import { HelpPage } from '../pages/help/help';

const appRoutes: Routes = [
  { path: 'help', component: HelpPage}
];

@NgModule({
  declarations: [
    AppComponent,
    HelpPage
],
  imports: [
    BrowserModule,
    HttpModule,
    ForumModule,
    RouterModule.forRoot( appRoutes )
    
  ],
  bootstrap: [ AppComponent ],
  providers: [ ]
})
export class AppModule {}


