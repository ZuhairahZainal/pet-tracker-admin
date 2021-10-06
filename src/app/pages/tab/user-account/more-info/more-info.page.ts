import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/auth/user';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.page.html',
  styleUrls: ['./more-info.page.scss'],
})
export class MoreInfoPage implements OnInit {

  public user: User;
  userId: string;
  userDetails;

  constructor(private activatedRoute: ActivatedRoute,
              private firestore: AngularFirestore,
              private userService: UsersService) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');

    this.userService.getUserDetails(this.userId).subscribe( userDetails => {
      this.user = userDetails;
    });
  }

}
