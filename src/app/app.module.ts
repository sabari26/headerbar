import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Injector } from '@angular/core';
import  { createCustomElement } from '@angular/elements';
import {Location,APP_BASE_HREF} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadermenuComponent } from './headermenu/headermenu.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadermenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  entryComponents :  [
    HeadermenuComponent
 ]
})
export class AppModule {
  constructor(private injector : Injector){}
  ngDoBootstrap(){
      const el = createCustomElement(HeadermenuComponent, {injector : this.injector});
  customElements.define('x-header-menu',el);
  }
 }
