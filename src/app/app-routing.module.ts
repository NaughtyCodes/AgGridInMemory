import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppformsComponent } from './appforms/appforms.component';

const routes: Routes = [
  { path: 'app/forms', component: AppformsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
