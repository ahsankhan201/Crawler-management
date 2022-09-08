import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { CrawlerService } from '../../services/crawler.service';

@Component({
  selector: 'app-proxy-form',
  templateUrl: './proxy-form.component.html',
  styleUrls: ['./proxy-form.component.scss']
})
export class ProxyFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private crawlerService: CrawlerService, private proxyDialog: MatDialogRef<ProxyFormComponent>,
  ) { }
  proxyForm!: FormGroup;
  submitted = false;
  private unsubscribe$ = new Subject();

  ngOnInit(): void {
    this.initializeProxyFormControls();
  }

  /**
  * @methodName initializeProxyFormControls
  * @description set proxy form properties
  * @parameters none
  * @return none
  */

  initializeProxyFormControls(): void {
    this.proxyForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      hostName: ['', [Validators.required]],
      port: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      type: ['', [Validators.required]],
      active: [1],
    });
  }

  /**
  * @methodName f
  * @description get proxy form controls
  * @parameters none
  * @return form controls
  */
  get proxyFormControls() {
    return this.proxyForm.controls;
  }

   /**
* @methodName setCheckboxControlValue
* @description set Check box selection or diselction value
* @parameters box and control
* @return none
*/
setCheckboxControlValue(box: any, control: string) {
  box.checked ? this.proxyFormControls[control].setValue(1) : this.proxyFormControls[control].setValue(0);
}


  /**
   * @methodName newProxy
   * @description add new proxy
   * @parameters none
   * @return void
   */
  newProxy(): void {
    this.submitted = true;

    if (this.proxyForm.invalid) {
      return;
    }
    this.crawlerService.newProxy(this.proxyForm.value).pipe(takeUntil(this.unsubscribe$)).subscribe((proxy) => {
      this.proxyDialog.close(proxy);
    }, (err) => {
      console.error(err);
    });
  }

  /**
  * @methodName close
  * @description close proxy popup
  * @parameters none
  * @return void
  */
  close(): void {
    this.proxyDialog.close();
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
