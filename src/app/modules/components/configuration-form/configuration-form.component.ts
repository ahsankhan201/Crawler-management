import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Configurations } from 'src/app/model/configuration';
import { CrawlerService } from '../../services/crawler.service';

@Component({
  selector: 'app-configuration-form',
  templateUrl: './configuration-form.component.html',
  styleUrls: ['./configuration-form.component.scss']
})
export class ConfigurationFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private crawlerService: CrawlerService, private configurationDialog: MatDialogRef<ConfigurationFormComponent>,) { }
  configurationForm!: FormGroup;
  submitted = false;
  private unsubscribe$ = new Subject();

  ngOnInit(): void {
    this.InitializeConfigurationFormControls();
  }

  /**
     * @methodName InitializeConfigurationFormControls
     * @description set cofiguration form data
     * @parameters none
     *  @return void
     */
  InitializeConfigurationFormControls(): void {
    this.configurationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      active: [1],
    });
  }

  /**
   * @methodName configurationFormControls
   * @description get proxy form controls
   * @parameters none
   * @return form controls
   */
  get configurationFormControls() {
    return this.configurationForm.controls;
  }

  /**
   * @methodName addConfiguration
   * @description add cofiguration data
   * @parameters configuration
   * @retuen void
   */
  addConfiguration(): void {
    this.submitted = true;
    if (this.configurationForm.invalid) {
      return;
    }
    this.crawlerService.addConfiguration(this.configurationForm.value).pipe(takeUntil(this.unsubscribe$)).subscribe((configuration: Configurations) => {
      this.configurationDialog.close(configuration);
    }, (err) => {
      console.log(err);
    })
  }

  /**
* @methodName setCheckboxControlValue
* @description set Check box selection or diselction value
* @parameters box and control
* @return none
*/
  setCheckboxControlValue(box: any, control: string):void {
    box.checked ? this.configurationFormControls[control].setValue(1) : this.configurationFormControls[control].setValue(0);
  }

  /**
  * @methodName close
  * @description close configuration popup
  * @parameters none
  * @return void
  */
  close(): void {
    this.configurationDialog.close();
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
