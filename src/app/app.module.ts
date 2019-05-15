import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';

import { AppModalForm } from './app.modal.form';
import { AppformsComponent } from './appforms/appforms.component';
import { CustomToolbarComponent } from './custom-toolbar/custom-toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AppModalForm,
    AppformsComponent,
    CustomToolbarComponent
  ],
  entryComponents: [AppModalForm],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
