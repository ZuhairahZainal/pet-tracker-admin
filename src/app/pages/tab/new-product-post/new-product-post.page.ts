import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/sales/product';
import { SalesService } from 'src/app/services/sales/sales.service';

@Component({
  selector: 'app-new-product-post',
  templateUrl: './new-product-post.page.html',
  styleUrls: ['./new-product-post.page.scss'],
})
export class NewProductPostPage implements OnInit {

  disapproval = {
    time: new Date().getTime(),
    date: new Date().toDateString(),
    category: 'Disapproval Post',
    message: 'Your previous post has been deleted due to '
  }

  public segment: string = "pending";
  public productList: Observable<Product[]>;

  constructor(private saleService: SalesService,
              private alertCtrl: AlertController,
              private firestore: AngularFirestore,
              private router: Router) {}

  ngOnInit() {
    this.productList = this.saleService.getUserProduct();
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
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
    this.firestore.collection('notification').doc(userId).set(this.disapproval);

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
}
