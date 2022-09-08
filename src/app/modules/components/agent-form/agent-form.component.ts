import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { CrawlerService } from '../../services/crawler.service';

@Component({
  selector: 'app-proxy-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.scss']
})
export class AgentFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private crawlerService: CrawlerService, private agentDialog: MatDialogRef<AgentFormComponent>,) { }
  agentForm!: FormGroup;
  submitted = false;
  private unsubscribe$ = new Subject();

  ngOnInit(): void {
    this.initailizeAgentFormControls();
  }

  /**
 * @methodName initailizeAgentFormControls
 * @description set agent form properties
 * @parameters none
 * @return void
 */
  initailizeAgentFormControls(): void {
    this.agentForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      identification: ['', [Validators.required]],
      multilogin_id: ['', [Validators.required]],
      multilogin_profile: ['', [Validators.required]],
      location: ['', [Validators.required]],
      active: [1],
    });
  }

  /**
* @methodName setCheckboxControlValue
* @description set Check box selection or diselction value
* @parameters box and control
* @return none
*/
  setCheckboxControlValue(box: any, control: string): void {
    box.checked ? this.agentFormControls[control].setValue(1) : this.agentFormControls[control].setValue(0);
  }

  /**
  * @methodName AgentFormControls
  * @description get agent form controls
  * @parameters none
  * @return form controls
  */
  get agentFormControls() {
    return this.agentForm.controls;
  }

  /**
   * @methodName addAgent
   * @description add Agent data
   * @parmeter none
   * @retuen void
   */
  addAgent(): void {
    this.submitted = true;
    if (this.agentForm.invalid) {
      return;
    }
    this.crawlerService.addAgent(this.agentForm.value).pipe(takeUntil(this.unsubscribe$)).subscribe((agent) => {
      this.agentDialog.close(agent)
    },
      (err) => {
        console.log(err)
      });
  }

  /**
  * @methodName close
  * @description close agent Modal
  * @parameters none
  * @return void
  */
  close(): void {
    this.agentDialog.close();
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
