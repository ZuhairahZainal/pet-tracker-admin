import { Component, OnInit } from '@angular/core';
import { DonationPost } from 'src/app/models/post/post';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PostService } from 'src/app/services/post/post.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx'

@Component({
  selector: 'app-donation-detail',
  templateUrl: './donation-detail.page.html',
  styleUrls: ['./donation-detail.page.scss'],
})
export class DonationDetailPage implements OnInit {

  disapproval = {
    time: new Date().getTime(),
    date: new Date().toDateString(),
    category: 'Disapproval Post',
    message: 'Your previous post has been deleted due to '
  }

  donationId: string;
  userId: string;
  userEmail: string;
  userDetails;
  public donation: DonationPost;
  donationPosts;

  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private alertCtrl: AlertController,
              private firestore: AngularFirestore,
              private router: Router,
              private composer: EmailComposer) { }

  ngOnInit() {
    this.donationId = this.activatedRoute.snapshot.paramMap.get('id');

    this.postService.getDonationDetail(this.donationId).subscribe(donation => {
      this.donation = donation;
      this.userId = donation['userId'];
      this.donationId = donation['donationFormId'];

      this.firestore.collection('users').doc(this.userId).valueChanges().subscribe( userDetail => {
        this.userDetails = userDetail;
        this.userEmail = userDetail['email'];
      });

      this.firestore.collection('donation').doc(this.userId).collection('timeline')
      .valueChanges().subscribe( donationPost => {
        this.donationPosts = donationPost;
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
    this.firestore.collection('feed').doc(userId).collection('donation').doc(timelineId).update({
      adminApprove: 'Approved'
    });

    this.firestore.collection('donationPost').doc(timelineId).update({
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

    // this.firestore.collection('feed').doc(userId).collection('donation').doc(timelineId).update({
    //   adminApprove: 'Disapproved'
    // });

    // this.firestore.collection('donationPost').doc(timelineId).update({
    //   adminApprove: 'Disapproved'
    // })

    this.firestore.collection('feed').doc(userId).collection('donation').doc(timelineId).delete()
    this.firestore.collection('donationPost').doc(timelineId).delete()
    .then( async success => {
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
