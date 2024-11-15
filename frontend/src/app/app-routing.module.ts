import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { RoomsPageComponent } from './views/rooms-page/rooms-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rum', component: RoomsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
