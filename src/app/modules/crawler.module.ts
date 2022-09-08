import { NgModule } from '@angular/core';
import { CrawlerRoutingModule } from './crawler-routing.module';
import { CrawlerComponent } from './components/crawler/crawler.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CrawlerFormComponent } from './components/crawler-form/crawler-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ProxyFormComponent } from './components/proxy-form/proxy-form.component';
import { ConfigurationFormComponent } from './components/configuration-form/configuration-form.component';
import { AgentFormComponent } from './components/agent-form/agent-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [CrawlerComponent, CrawlerFormComponent, ProxyFormComponent, ConfigurationFormComponent, AgentFormComponent],
  imports: [
    CrawlerRoutingModule,
    SharedModule,
    HttpClientModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ]
})
export class CrawlerModule { }
