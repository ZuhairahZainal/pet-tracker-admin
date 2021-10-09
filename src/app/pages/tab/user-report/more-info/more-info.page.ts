import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Report } from 'src/app/models/report/report';
import { ReportService } from 'src/app/services/report/report.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx'

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.page.html',
  styleUrls: ['./more-info.page.scss'],
})
export class MoreInfoPage implements OnInit {

  reportId: string;
  userId: string;
  userEmail: string;
  public report: Report;

  constructor(private activatedRoute: ActivatedRoute,
              private firestore: AngularFirestore,
              private alertCtrl: AlertController,
              private router: Router,
              private reportService: ReportService,
              private composer: EmailComposer) { }

  ngOnInit() {
    this.reportId = this.activatedRoute.snapshot.paramMap.get('id');

    this.reportService.getReportDetail(this.reportId).subscribe( reportDetails => {
      this.report = reportDetails;
      this.userId = reportDetails['userId'];
      this.reportId = reportDetails['reportId'];

      this.firestore.collection('users').doc(this.userId).valueChanges().subscribe( userDetail => {
        this.userEmail = userDetail['email'];
      });

    });

  }

  sendEmail(){
    console.log(this.userEmail);
    this.composer.open({
      to: this.userEmail
    })
  }}
