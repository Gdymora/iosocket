import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FormsModule } from '@angular/forms';
import { AlertMyModule } from './_alert';
import { AuthInterceptor } from './share/auth.interceptor';
import { AuthComponent } from './auth/auth.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = {
  url: 'http://localhost:3000', options: {
    /* extraHeaders: { Authorization: `Bearer ${localStorage.getItem('fb-token') }` }, */
    query: {
      token: localStorage.getItem('fb-token') 
    },  transports: ['websocket', 'polling', 'flashsocket'],  
  }
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AlertMyModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: AuthInterceptor
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
