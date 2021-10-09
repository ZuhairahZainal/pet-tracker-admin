import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Feed } from 'src/app/models/post/post';
import { PostService } from 'src/app/services/post/post.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx'

@Component({
  selector: 'app-feed-detail',
  templateUrl: './feed-detail.page.html',
  styleUrls: ['./feed-detail.page.scss'],
})
export class FeedDetailPage implements OnInit {

  disapproval = {
    createdAt: new Date().toDateString(),
    category: 'Disapproval Post',
    message: 'Your previous post has been deleted due to '
  }

  timelineId: string;
  userId: string;
  feedId: string;
  userEmail: string;
  userDetails;
  public timeline: Feed;
  feedPosts;

  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private alertCtrl: AlertController,
              private firestore: AngularFirestore,
              private router: Router,
              private composer: EmailComposer) { }

  ngOnInit() {
    this.timelineId = this.activatedRoute.snapshot.paramMap.get('id');

    this.postService.getFeedDetail(this.timelineId).subscribe(timeline => {
      this.timeline = timeline;
      this.userId = timeline['userId'];
      this.feedId = timeline['feedFormId'];

      this.firestore.collection('users').doc(this.userId).valueChanges().subscribe( userDetail => {
        this.userDetails = userDetail;
        this.userEmail = userDetail['email'];
      });

      this.firestore.collection('feed').doc(this.userId).collection('timeline')
      .valueChanges().subscribe( feedPost => {
        this.feedPosts = feedPost;
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
    this.firestore.collection('feed').doc(userId).collection('timeline').doc(timelineId).update({
      adminApprove: 'Approved'
    });

    this.firestore.collection('feedPost').doc(timelineId).update({
      adminApprove: 'Approved'
    }).then( async success => {
      let alert = await this.alertCtrl.create({
        header: 'Approval Success',
        message: 'Timeline Post has been Approved. Thank you Admin for your respond.',
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

    this.firestore.collection('feed').doc(userId).collection('timeline').doc(timelineId).update({
      adminApprove: 'Disapproved'
    });

    this.firestore.collection('feedPost').doc(timelineId).update({
      adminApprove: 'Disapproved'
    }).then( async success => {
      let alert = await this.alertCtrl.create({
        header: 'Disapproved Post',
        message: 'Timeline Post has been disapproved and notified to the user. Thank you Admin for your respond.',
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
