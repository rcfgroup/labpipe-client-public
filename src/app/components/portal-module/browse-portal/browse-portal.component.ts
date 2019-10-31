import {Component, NgZone, OnInit} from '@angular/core';
import {LabPipeService} from '../../../services/lab-pipe.service';
import {DatabaseService} from '../../../services/database.service';
import * as _ from 'lodash';
import {InAppAlertService, InAppMessage} from '../../../services/in-app-alert.service';

@Component({
  selector: 'app-browse-portal',
  templateUrl: './browse-portal.component.html',
  styleUrls: ['./browse-portal.component.css']
})
export class BrowsePortalComponent implements OnInit {
  messages: InAppMessage[] = [];

  remoteRecords: any[] = [];
  localRecords: any[] = [];

  remoteReport: any = {};

  showRemoteRecordReport: boolean;
  constructor(private lps: LabPipeService, private dbs: DatabaseService, private iaas: InAppAlertService) { }

  ngOnInit() {
    this.loadRemoteRecords();
    this.loadLocalRecords();
  }

  loadRemoteRecords() {
    this.lps.getAllRecord(true).subscribe(
      (data: any) => {
        this.remoteRecords = data;
      },
      (error: any) => console.log(error)
    );
  }

  loadLocalRecords() {
    this.dbs.readData().then((data: any[]) => {
      this.localRecords = data;
    });
  }

  upload(record: any) {
    this.lps.postRecord(record.data.url, record.data)
      .subscribe((data: any) => {
          this.iaas.success(data.message, this.messages);
        },
        (error: any) => {
          this.iaas.error(error.error.message, this.messages);
        });
  }

  report(record: any) {
    this.remoteReport = {record};
    this.showRemoteRecordReport = true;
    this.lps.getStudy(record.studyIdentifier).subscribe(
      (data: any) => {
        this.remoteReport.study = data;
      }
    );
    this.lps.getInstrument(record.instrumentIdentifier).subscribe(
      (data: any) => {
        this.remoteReport.instrument = data;
      }
    );
  }

  closeReport() {
    this.remoteReport = {};
    this.showRemoteRecordReport = false;
  }

  downloadPdf() {
    // TODO generate pdf report
  }

}
