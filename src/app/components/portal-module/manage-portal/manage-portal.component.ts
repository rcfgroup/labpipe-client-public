import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LabPipeService} from '../../../services/lab-pipe.service';
import {InAppAlertService} from '../../../services/in-app-alert.service';
import {CollectionName, EmailGroup, Role, Study} from '../../../models/parameter.model';

@Component({
  selector: 'app-manage-portal',
  templateUrl: './manage-portal.component.html',
  styleUrls: ['./manage-portal.component.css']
})
export class ManagePortalComponent implements OnInit {
  messages: { type: string, message: string, closed?: boolean }[] = [];

  showModal = {
    newOperator: false,
    newToken: false,
    newRole: false,
    newStudy: false,
  };
  operatorForm: FormGroup;
  studyForm: FormGroup;
  roleForm: FormGroup;

  studies: Study[];
  roles: Role[];
  notificationGroups: EmailGroup[];

  constructor(private formBuilder: FormBuilder, private lps: LabPipeService, private iaas: InAppAlertService) {
    this.operatorForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      projects: [[]],
      roles: [[]],
      notificationGroup: [[]]
    });
    this.roleForm = this.formBuilder.group({
      identifier: ['', Validators.required],
      name: ['', Validators.required]
    });
    this.studyForm = this.formBuilder.group({
      identifier: ['', Validators.required],
      name: ['', Validators.required],
      config: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  newOperator() {
    this.showModal.newOperator = true;
    this.lps.getParameter(CollectionName.STUDIES, true).subscribe(
      (data: Study[]) => this.studies = data
    );
    this.lps.getParameter(CollectionName.ROLES, true).subscribe(
      (data: Role[]) => this.roles = data
    );
    this.lps.getParameter(CollectionName.EMAIL_GROUPS, true).subscribe(
      (data: EmailGroup[]) => this.notificationGroups = data
    );
  }

  newToken() {
    this.showModal.newToken = true;
  }

  newRole() {
    this.showModal.newToken = true;
  }

  onConfirmNewOperator(confirm: boolean) {
    if (confirm) {
      if (this.operatorForm.valid) {
        this.lps.addOperator(this.operatorForm.value)
          .subscribe((data: any) => this.iaas.success(data.message, this.messages),
            (error: any) => this.iaas.error(error.error.message, this.messages));
      }
    }
    this.showModal.newOperator = false;
    this.operatorForm.reset();
  }

  onConfirmNewToken(confirm: boolean) {
    if (confirm) {
      this.lps.addToken().subscribe((data: any) => this.iaas.success(data.message, this.messages),
        (error: any) => this.iaas.error(error.error.message, this.messages));
    }
    this.showModal.newToken = false;
  }

  onConfirmNewRole(confirm: boolean) {
    if (confirm) {
      this.lps.addRole(this.roleForm.value).subscribe((data: any) => this.iaas.success(data.message, this.messages),
        (error: any) => this.iaas.error(error.error.message, this.messages));
    }
    this.showModal.newToken = false;
  }


}
