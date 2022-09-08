import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrawlerService } from '../../services/crawler.service';
import { MatDialog } from '@angular/material/dialog';
import { ProxyFormComponent } from '../proxy-form/proxy-form.component';
import { ConfigurationFormComponent } from '../configuration-form/configuration-form.component';
import { AgentFormComponent } from '../agent-form/agent-form.component';
import { Configuration } from 'src/app/model/configuration';
import { Agent } from 'src/app/model/agent';
import { Proxy } from 'src/app/model/proxy';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { APPCONSTANTS } from 'src/app/constant/app.constant';

@Component({
  selector: 'app-crawler-form',
  templateUrl: './crawler-form.component.html',
  styleUrls: ['./crawler-form.component.scss']
})
export class CrawlerFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private crawlerService: CrawlerService,
    private matDialog: MatDialog,
    private router: Router) { }
  crawlerForm!: FormGroup;
  submitted = false;
  private unsubscribe$ = new Subject();
  proxyLoader: boolean = false
  configurationLoader: boolean = false
  agentLoader: boolean = false

  proxies: Proxy[] = []
  configurations: Configuration[] = []
  agents: Agent[] = []

  ngOnInit(): void {
    this.initializeCrawlerFormControls();
    this.getProxies();
    this.getConfiguration();
    this.getAgents();

  }

  /**
   * @methodName initializeCrawlerFormControls
   * @description create Crawler form
   * @parameters none
   * @return none
   */
  initializeCrawlerFormControls(): void {
    this.crawlerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      active: [1, [Validators.required]],
      new: [1, [Validators.required]],
      updated: ['', [Validators.required]],
      testing: ['', [Validators.required]],
      proxy_id: ['', [Validators.required]],
      agent_id: ['', [Validators.required]],
      configuration_id: ['', [Validators.required]],
    });
  }

  /**
  * @methodName crawlerFormControls
  * @description get proxy form controls
  * @parameters none
  * @return form controls
  */
  get crawlerFormControls() {
    return this.crawlerForm.controls;
  }

/**
* @methodName setCheckboxControlValue
* @description set Check box selection or diselction value
* @parameters box and control
* @return none
*/
  setCheckboxControlValue(box: any, control: string): void {
    box.checked ? this.crawlerFormControls[control].setValue(1) : this.crawlerFormControls[control].setValue(0);
  }

  /**
  * @methodName getProxies
  * @description get Proxies dropdown data
  * @parameters none
  * @return none
  */
  getProxies(): void {
    this.proxyLoader = true
    this.crawlerService.getProxies().pipe(takeUntil(this.unsubscribe$)).subscribe((proxy) => {
      this.proxyLoader = false
      this.proxies = proxy.data;
      this.crawlerFormControls[APPCONSTANTS.FORMCONTROLS.CRAWLER.PROXY_ID].setValue(this.proxies[0].id);
    }, (err) => {
      console.log(err);
    });
  }

  /**
   * @methodName getConfiguration
   * @description get Configuration dropdown data
   * @parameters none
   * @return none
   */
  getConfiguration(): void {
    this.configurationLoader = true;
    this.crawlerService.getConfiguration().pipe(takeUntil(this.unsubscribe$)).subscribe((Configurations) => {
      this.configurationLoader = false
      this.configurations = Configurations.data;
      this.crawlerFormControls[APPCONSTANTS.FORMCONTROLS.CRAWLER.CONFIGURATION_ID].setValue(this.configurations[0].id);
    }, (err) => {
      console.log(err);
    });
  }

  /**
   * @methodName getAgents
   * @description get agents dropdown data
   * @parameters none
   * @return none
   */
  getAgents(): void {
    this.agentLoader = true
    this.crawlerService.getAgents().pipe(takeUntil(this.unsubscribe$)).subscribe((agents) => {
      this.agentLoader = false
      this.agents = agents.data;
      this.crawlerFormControls[APPCONSTANTS.FORMCONTROLS.CRAWLER.AGENT_ID].setValue(this.agents[0].id);
    }, (err) => {
      console.log(err);
    });
  }

  /**
   * @methodName proxyPopup
   * @description set proxy popup data
   * @parameters none
   * @return none
   */
  proxyPopup(): void {
    const proxyDialog = this.matDialog.open(ProxyFormComponent, {
      data: {},
      width: APPCONSTANTS.DIALOG.WIDTH,
      hasBackdrop: true,
    });
    if (proxyDialog) {
      proxyDialog.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(proxy => {
        if (proxy) {
          const { data } = proxy;
          if (data.id) {
            this.proxies.push(data)
            this.crawlerFormControls[APPCONSTANTS.FORMCONTROLS.CRAWLER.PROXY_ID].setValue(data.id);
          }
        }
      }, (err) => {
        console.log(err);
      });
    }
  }

  /**
   * @methodName agentPopup
   * @description set agent popup data
   * @parameters none
   * @return void
   */
  agentPopup(): void {
    const agentDialog = this.matDialog.open(AgentFormComponent, {
      data: {},
      width: APPCONSTANTS.DIALOG.WIDTH,
      hasBackdrop: true
    });
    if (agentDialog) {
      agentDialog.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(agent => {
        if (agent) {
          const { data } = agent;
          if (data.id) {
            this.agents.push(data);
            this.crawlerFormControls[APPCONSTANTS.FORMCONTROLS.CRAWLER.AGENT_ID].setValue(data.id);
          }
        }
      }, (err) => {
        console.log(err);
      });
    }
  }


  /**
   * @methodName configurationPopup
   * @description open configuration Popup
   * @parameters none
   * @return void
   */
  configurationPopup(): void {
    const configurationDialog = this.matDialog.open(ConfigurationFormComponent, {
      data: {},
      width: APPCONSTANTS.DIALOG.WIDTH,
      hasBackdrop: true
    });
    if (configurationDialog) {
      configurationDialog.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(configuration => {
        if (configuration) {
          const { data } = configuration;
          if (data.id) {
            this.configurations.push(data);
            this.crawlerFormControls[APPCONSTANTS.FORMCONTROLS.CRAWLER.CONFIGURATION_ID].setValue(data.id);
          }
        }
      }, (err) => {
        console.error(err);
      });
    }
  }

  /**
   * @methodName submitCrawler
   * @description Add crawler data
   * @parameters none
   * @return void
   */
  submitCrawler(): void {
    this.submitted = true;
    if (this.crawlerForm.invalid) {
      return;
    }
    this.crawlerService.createCrawler(this.crawlerForm.value).pipe(takeUntil(this.unsubscribe$)).subscribe((crawler) => {
      this.router.navigate(['/' + `${APPCONSTANTS.ROUTES.MODULES.APP.CRAWLER}`])
    }, (err) => {
      console.error(err)
    })
  }

  /**
   * @methodName reset
   * @description reset form felds
   * @parameters none
   * @return void
   */
  reset(): void {
    this.crawlerForm.reset();
  }

  /**
     * @methodName ngOnDestroy
     * @description unsubscribe all subscription
     * @parameters none
     * @return void
     */
  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }
}
