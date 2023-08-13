import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDocsComponent } from './list-docs/list-docs.component';

const routes: Routes = [
  { path: 'documents', component: ListDocsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
