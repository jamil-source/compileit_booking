import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { SharedBtnComponent } from './shared/components/shared-btn/shared-btn.component';
import { RoomsPageComponent } from './views/rooms-page/rooms-page.component';
import { provideHttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SweDatePipe } from './shared/pipes/swe-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SharedBtnComponent,
    RoomsPageComponent,
    SweDatePipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
