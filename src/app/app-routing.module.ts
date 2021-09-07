import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsComponent } from '../app/components/news/news.component';
import { NewsFormComponent } from '../app/components/news-form/news-form.component';
const routes: Routes = [
  {
  path:'news',
  component: NewsComponent
},
{
  path:'',
  redirectTo:'',
  component:NewsComponent,
  pathMatch: 'full'
},
{
  path:'news/:search',
  component:NewsComponent
},
{
  path:'news-form',
  component:NewsFormComponent
},
{
  path:'news-edit/:id',
  component:NewsFormComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
