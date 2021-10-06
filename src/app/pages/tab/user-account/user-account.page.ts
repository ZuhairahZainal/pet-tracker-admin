import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/auth/user';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.page.html',
  styleUrls: ['./user-account.page.scss'],
})
export class UserAccountPage implements OnInit {

  public segment: string = "all";
  public userAccount: Observable<User[]>;

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userAccount = this.userService.getUserAccount();
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

}
