import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import {CRUDComponent} from './crud/crud.component';
import {AppComponent} from './app.component';
const routes: Routes = [
  {path:'CRUD', component: CRUDComponent},
  {path:'Home', component: AppComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
