import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Crawler } from 'src/app/model/crawler';
import { CrawlerService } from '../../services/crawler.service';
import {APPCONSTANTS} from 'src/app/constant/app.constant'
@Component({
  selector: 'app-crawler',
  templateUrl: './crawler.component.html',
  styleUrls: ['./crawler.component.scss']
})
export class CrawlerComponent implements OnInit {
  crawlerColumns: string[] = APPCONSTANTS.TABLE.HEADERS.CRAWLER;
  showLoader: boolean = false;
  private unsubscribe$ = new Subject();

  constructor(private crawlerService: CrawlerService) { }
  crawlers: Crawler[] = [];

  ngOnInit(): void {
    this.getCrawlers();
  }

  /**
  * @methodName getCrawlers
  * @description get crawler data
  * @parameters none
  * @return void
  */
  getCrawlers(): void {
    this.showLoader = true
    this.crawlerService.getCrawlers().pipe(takeUntil(this.unsubscribe$)).subscribe((crawler) => {
      this.showLoader = false
      this.crawlers = crawler.data;
    }, (err) => {
      console.log(err);
    })
  }


  /**
    * @methodName ngOnDestroy
    * @description unsubscribe all subscriptions
    * @parameters none
    * @return void
    */
  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }

}
