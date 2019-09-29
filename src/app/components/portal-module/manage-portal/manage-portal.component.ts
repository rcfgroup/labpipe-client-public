import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LabPipeService} from '../../../services/lab-pipe.service';
import {InAppAlertService} from '../../../services/in-app-alert.service';

@Component({
  selector: 'app-manage-portal',
  templateUrl: './manage-portal.component.html',
  styleUrls: ['./manage-portal.component.css']
})
export class ManagePortalComponent implements OnInit {
  messages: { type: string, message: string, closed?: boolean }[] = [];

  showNewOperatorModal: boolean;
  operatorForm: FormGroup;

  showNewTokenModal: boolean;

  constructor(private formBuilder: FormBuilder, private lps: LabPipeService, private iaas: InAppAlertService) {
    this.operatorForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
  }

  newOperator() {
    this.showNewOperatorModal = true;
  }

  newToken() {
    this.showNewTokenModal = true;
  }

  onConfirmNewOperator(confirm: boolean) {
    if (confirm) {
      if (this.operatorForm.valid) {
        this.lps.addOperator(this.operatorForm.get('name').value, this.operatorForm.get('email').value)
          .subscribe((data: any) => this.iaas.success(data.message, this.messages),
            (error: any) => this.iaas.error(error.error.message, this.messages));
      }
    }
    this.showNewOperatorModal = false;
    this.operatorForm.reset();
  }

  onConfirmNewToken(confirm: boolean) {
    if (confirm) {
      this.lps.addToken().subscribe((data: any) => this.iaas.success(data.message, this.messages),
        (error: any) => this.iaas.error(error.error.message, this.messages));
    }
    this.showNewTokenModal = false;
  }


}
