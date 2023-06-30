import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {NgFor} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListDocsComponent } from './list-docs/list-docs.component';

@NgModule({
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    NgFor,
    MatButtonModule
  ],
  declarations: [
    AppComponent,
   ListDocsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
