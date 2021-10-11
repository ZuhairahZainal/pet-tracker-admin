import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LostPetPost } from 'src/app/models/post/post';
import { PostService } from 'src/app/services/post/post.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx'

@Component({
  selector: 'app-lostpet-detail',
  templateUrl: './lostpet-detail.page.html',
  styleUrls: ['./lostpet-detail.page.scss'],
})
export class LostpetDetailPage implements OnInit {

  disapproval = {
    time: new Date().getTime(),
    date: new Date().toDateString(),
    category: 'Disapproval Post',
    message: 'Your previous post has been deleted due to '
  }

  lostPetId: string;
  userId: string;
  userEmail: string;
  userDetails;
  public lostpet: LostPetPost;
  lostPetPosts;

  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private alertCtrl: AlertController,
              private firestore: AngularFirestore,
              private router: Router,
              private composer: EmailComposer) { }

  ngOnInit() {
    this.lostPetId = this.activatedRoute.snapshot.paramMap.get('id');

    this.postService.getLostPetDetail(this.lostPetId).subscribe(lostpet => {
      this.lostpet = lostpet;
      this.userId = lostpet['userId'];
      this.lostPetId = lostpet['lostPetFormId'];

      this.firestore.collection('users').doc(this.userId).valueChanges().subscribe( userDetail => {
        this.userDetails = userDetail;
        this.userEmail = userDetail['email'];
      });

      this.firestore.collection('lostPet').doc(this.userId).collection('timeline')
      .valueChanges().subscribe( lostPetPost => {
        this.lostPetPosts = lostPetPost;
      });
    });

  }

  async approveBtn(timelineId: string, userId: string){
    const alert = await this.alertCtrl.create({
      header: 'Approve Post',
      message: 'Are you sure you want to approve this timeline post?',
      buttons: [
        {
          text: 'Yes',
          handler: () => this.approvePost(timelineId, userId)
        },
        {
          text: 'No'
        }
      ]
    });
    alert.present();
  }

  approvePost(timelineId: string, userId: string){
    this.firestore.collection('lostPet').doc(userId).collection('timeline').doc(timelineId).update({
      adminApprove: 'Approved'
    });

    this.firestore.collection('lostPetPost').doc(timelineId).update({
      adminApprove: 'Approved'
    }).then( async success => {
      let alert = await this.alertCtrl.create({
        header: 'Approval Success',
        message: 'Lost Pet Post has been Approved. Thank you Admin for your respond.',
        buttons: ['OK']
      });
      alert.present();
      this.router.navigate(['tab/timeline-post']);
    })
  }

  async disapproveBtn(timelineId: string, userId: string){
    const alert = await this.alertCtrl.create({
      header: 'Reject Request',
      message: 'Are you sure you want to disapprove this timeline post?',
      buttons: [
        {
          text: 'Yes',
          handler: () =>  this.disapprovePost(timelineId, userId),
        },
        {
          text: 'No'
        }
      ]
    });
    alert.present();
  }

  disapprovePost(timelineId: string, userId: string){
    this.firestore.collection('users').doc(userId).collection('notification').add(this.disapproval);
    this.firestore.collection('notification').doc(userId).set(this.disapproval);

    this.firestore.collection('lostPet').doc(userId).collection('timeline').doc(timelineId).update({
      adminApprove: 'Disapproved'
    });

    this.firestore.collection('lostPetPost').doc(timelineId).update({
      adminApprove: 'Disapproved'
    }).then( async success => {
      let alert = await this.alertCtrl.create({
        header: 'Disapproved Post',
        message: 'Lost Pet Post has been disapproved and notified to the user. Thank you Admin for your respond.',
        buttons: [
          {text: 'OK',
          handler: () => this.router.navigate(['tab/timeline-post'])
        }]

      });
      alert.present();
    })
  }

  sendEmail(){
    console.log(this.userEmail);
    this.composer.open({
      to: this.userEmail
    })
  }


}
