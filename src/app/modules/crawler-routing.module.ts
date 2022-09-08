import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentFormComponent } from './components/agent-form/agent-form.component';
import { ConfigurationFormComponent } from './components/configuration-form/configuration-form.component';
import { CrawlerFormComponent } from './components/crawler-form/crawler-form.component';
import { CrawlerComponent } from './components/crawler/crawler.component';
import { ProxyFormComponent } from './components/proxy-form/proxy-form.component';
import { APPCONSTANTS } from '../constant/app.constant';

const routes: Routes = [
  {
    path: '',
    component: CrawlerComponent,
  },
  {
    path: APPCONSTANTS.ROUTES.MODULES.CRAWLER.CRAWLERFORM,
    component: CrawlerFormComponent,
  },

  {
    path: APPCONSTANTS.ROUTES.MODULES.CRAWLER.PROXYFORM,
    component: ProxyFormComponent,
  },

  {
    path: APPCONSTANTS.ROUTES.MODULES.CRAWLER.CONFIGURATIONFORM,
    component: ConfigurationFormComponent,
  },

  {
    path: APPCONSTANTS.ROUTES.MODULES.CRAWLER.AGENTFORM,
    component: AgentFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrawlerRoutingModule { }
