import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {NgFor} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListDocsComponent } from './list-docs/list-docs.component';
import { AddDocumentComponent } from './list-docs/add-document/add-document/add-document.component';
import { EditDocumentComponent } from './list-docs/edit-document/edit-document/edit-document.component';

@NgModule({
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    NgFor,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
   ListDocsComponent,
   AddDocumentComponent,
   EditDocumentComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
