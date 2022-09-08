import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProxy, Proxy } from 'src/app/model/proxy';
import { Agent } from 'src/app/model/agent';
import { Crawler } from 'src/app/model/crawler';
import { Configuration, Configurations } from 'src/app/model/configuration';
import { environment } from 'src/environments/environment';
import { APPCONSTANTS } from 'src/app/constant/app.constant';


@Injectable({
  providedIn: 'root'
})
export class CrawlerService {
  baseUrl = `${environment.apiBaseURL}`
  constructor(private http: HttpClient) { }


  /**
   * @methodName setRequestHeaders
   * @description set request headers
   * @parameters none
   * @return headers
   */

  setRequestHeaders() {
    let headers = {
      Authorization: `${APPCONSTANTS.AUTHENTICATION.BEARER} ${APPCONSTANTS.AUTHENTICATION.TOKEN}`
    };
    return headers;
  }

  /**
  * @methodName getCrawlers
  * @description get Crawlers data
  * @parameters none
  * @return Observable<any>
  */

  getCrawlers(): Observable<any> {
    const url = `${this.baseUrl}/${APPCONSTANTS.APICONSTANT.CRAWLER}`;
    return this.http.get(url, {
      headers: this.setRequestHeaders(),
    })
  }

  /**
  * @methodName getProxies
  * @description get proxy data
  * @parameters none
  * @return Observable<any>
  */

  getProxies(): Observable<any> {
    const url = `${this.baseUrl}/${APPCONSTANTS.APICONSTANT.PROXIES}`;
    return this.http.get(url, {
      headers: this.setRequestHeaders(),
    });
  }

  /**
   * @methodName getConfiguration
   * @description get cofiguration data
   * @parameters none
   * @return Observable<any>
   */

  getConfiguration(): Observable<any> {
    return this.http.get(`${this.baseUrl}/${APPCONSTANTS.APICONSTANT.CONFIGURATION}`, {
      headers: this.setRequestHeaders(),
    });
  }



  /**
   * @methodName addConfiguration
   * @description add cofiguration data
   * @parameters configuration
   * @return Observable<Configurations>
   */
  addConfiguration(configuration: Configuration): Observable<Configurations> {
    const url = `${this.baseUrl}/${APPCONSTANTS.APICONSTANT.CONFIGURATION}`;
    return this.http.post(url, configuration, {
      headers: this.setRequestHeaders(),
    });
  }

  /**
    * @methodName getAgents
    * @description get cofiguration data
    * @parameters configuration
    * @return Observable<Configurations>
    */

  getAgents(): Observable<any> {
    const url = `${this.baseUrl}/${APPCONSTANTS.APICONSTANT.AGENTS}`;
    return this.http.get(url, {
      headers: this.setRequestHeaders(),
    });
  }

  /**
     * @methodName newProxy
     * @description add proxy data
     * @parameters proxy
     * @return Observable<IProxy>
     */

  newProxy(proxy: Proxy): Observable<IProxy> {
    const url = `${this.baseUrl}/${APPCONSTANTS.APICONSTANT.PROXIES}`;
    return this.http.post(url, proxy, {
      headers: this.setRequestHeaders(),
    });
  }

  /**
   * create crawler
   * @param crawler 
   * @returns 
   */
  createCrawler(crawler: Crawler): Observable<any> {
    const url = `${this.baseUrl}/${APPCONSTANTS.APICONSTANT.CRAWLER}`;
    return this.http.post(url, crawler, {
      headers: this.setRequestHeaders(),
    });
  }

  /**
   * add agent 
   * @param agent 
   * @returns 
   */

  addAgent(agent: Agent): Observable<any> {
    const url = `${this.baseUrl}/${APPCONSTANTS.APICONSTANT.AGENTS}`;
    return this.http.post(url, agent, {
      headers: this.setRequestHeaders(),
    });
  }

}