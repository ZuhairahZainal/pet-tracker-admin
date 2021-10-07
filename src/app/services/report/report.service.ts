import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Report } from 'src/app/models/report/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(public firestore: AngularFirestore) {}

  getUserReport(): Observable<Report[]>{
    return this.firestore.collection<Report>('report').valueChanges();
  }

  getReportDetail(reportId: string): Observable<Report> {
    return this.firestore.collection('report').doc<Report>(reportId).valueChanges();
  }

}
