import {Component, NgZone, OnInit} from '@angular/core';
import {LabPipeService} from '../../../services/lab-pipe.service';
import {DatabaseService} from '../../../services/database.service';

@Component({
  selector: 'app-browse-portal',
  templateUrl: './browse-portal.component.html',
  styleUrls: ['./browse-portal.component.css']
})
export class BrowsePortalComponent implements OnInit {
  remoteRecords: any[] = [];
  localRecords: any[] = [];

  remoteReport: any = {};

  showRemoteRecordReport: boolean;
  constructor(private lps: LabPipeService, private dbs: DatabaseService, private zone: NgZone) { }

  ngOnInit() {
    this.loadRemoteRecords();
    this.loadLocalRecords();
  }

  loadRemoteRecords() {
    this.lps.getAllRecord().subscribe(
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
