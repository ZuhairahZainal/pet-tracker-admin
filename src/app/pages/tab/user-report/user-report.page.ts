import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Report } from 'src/app/models/report/report';
import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.page.html',
  styleUrls: ['./user-report.page.scss'],
})
export class UserReportPage implements OnInit {

  public reportList: Observable<Report[]>;

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.reportList = this.reportService.getUserReport();
  }

}
