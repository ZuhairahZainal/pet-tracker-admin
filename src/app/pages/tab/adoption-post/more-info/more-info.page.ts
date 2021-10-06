import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Adoption } from 'src/app/models/adoption/adoption';
import { AdoptionService } from 'src/app/services/adoption/adoption.service';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.page.html',
  styleUrls: ['./more-info.page.scss'],
})
export class MoreInfoPage implements OnInit {

  disapproval = {
    createdAt: new Date().toDateString(),
    category: 'Disapproval Adoption Post',
    message: 'Your previous post has been deleted due to '
  }

  adoptionId: string;
  public adoption: Adoption;
  userId: string;
  petId: string;
  userDetails;
  adoptionPosts;
  petRequestedDetails;

  constructor(private activatedRoute: ActivatedRoute,
              private firestore: AngularFirestore,
              private alertCtrl: AlertController,
              private router: Router,
              private adoptionService: AdoptionService) { }

  ngOnInit() {
    this.adoptionId = this.activatedRoute.snapshot.paramMap.get('id');

    this.adoptionService.getAdoptionDetail(this.adoptionId).subscribe(adoptionDetail => {
      this.adoption = adoptionDetail;
      this.userId = adoptionDetail['userId'];
      this.petId = adoptionDetail['petId'];

      this.firestore.collection('users').doc(this.userId).valueChanges().subscribe( userDetail => {
        this.userDetails = userDetail;
      });

      this.firestore.collection('adoption').doc(this.userId).collection('adoptionDetail')
      .valueChanges().subscribe( adoptionPost => {
        this.adoptionPosts = adoptionPost;
      });

      this.firestore.collection('adoption').doc(this.userId).collection('adoptionDetail').doc(this.petId)
      .valueChanges().subscribe( petRequestedDetail => {
        this.petRequestedDetails = petRequestedDetail;
      });
    });
  }

  async approveBtn(adoptionId: string, userId: string){
    const alert = await this.alertCtrl.create({
      header: 'Approve Post',
      message: 'Are you sure you want to approve this adoption post?',
      buttons: [
        {
          text: 'Yes',
          handler: () =>  {this.approvePost(adoptionId, userId);
        }
        },
        {
          text: 'No'
        }
      ]
    });
    alert.present();
  }

  approvePost(adoptionId: string, userId: string){
    this.firestore.collection('adoption').doc(userId).collection('adoptionDetail').doc(adoptionId).update({
      adminApprove: 'Approved'
    });

    this.firestore.collection('adoptionPost').doc(adoptionId).update({
      adminApprove: 'Approved'
    }).then( async success => {
      let alert = await this.alertCtrl.create({
        header: 'Approval Success',
        message: 'Adoption Post has been Approved. Thank you Admin for your respond.',
        buttons: [
          {text: 'OK',
          handler: () => this.router.navigate(['tab/adoption-post'])
        }]
      });
      alert.present();
    })
  }

  async disapproveBtn(adoptionId: string, userId: string){
    const alert = await this.alertCtrl.create({
      header: 'Reject Request',
      message: 'Are you sure you want to disapprove this adoption post?',
      buttons: [
        {
          text: 'Yes',
          handler: () =>  this.disapprovePost(adoptionId, userId),
        },
        {
          text: 'No'
        }
      ]
    });
    alert.present();
  }

  disapprovePost(adoptionId: string, userId: string){
    this.firestore.collection('users').doc(userId).collection('notification').add(this.disapproval);

    this.firestore.collection('adoption').doc(userId).collection('adoptionDetail').doc(adoptionId).update({
      adminApprove: 'Disapproved'
    });

    this.firestore.collection('adoptionPost').doc(adoptionId).update({
      adminApprove: 'Disapproved'
    }).then( async success => {
      let alert = await this.alertCtrl.create({
        header: 'Disapproved Post',
        message: 'Adoption Post has been disapproved and notified to the user. Thank you Admin for your respond.',
        buttons: [
          {text: 'OK',
          handler: () => this.router.navigate(['tab/adoption-post'])
        }]

      });
      alert.present();
    })
  }

  sendEmail(){
    console.log('email')
  }
}
