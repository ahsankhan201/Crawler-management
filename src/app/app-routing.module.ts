import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APPCONSTANTS } from './constant/app.constant';

const routes: Routes = [
  {
    path: APPCONSTANTS.ROUTES.MODULES.APP.CRAWLER,
    loadChildren: () =>
      import("src/app/modules/crawler.module").then((m) => m.CrawlerModule),
  },
  { path: '', redirectTo: APPCONSTANTS.ROUTES.MODULES.APP.CRAWLER, pathMatch: 'full' },
  { path: '**', redirectTo: APPCONSTANTS.ROUTES.MODULES.APP.CRAWLER },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
