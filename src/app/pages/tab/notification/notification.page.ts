import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminNotif } from 'src/app/models/notification/notification';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  public notification: Observable<AdminNotif[]>;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notification = this.notificationService.getNotification();
  }

}
