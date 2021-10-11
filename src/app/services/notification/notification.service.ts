import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AdminNotif } from 'src/app/models/notification/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public firestore: AngularFirestore) { }

    getNotification(): Observable<AdminNotif[]>{
      return this.firestore.collection<AdminNotif>(`admin-notification`, ref => ref.orderBy('time', 'desc')).valueChanges();
    }}
