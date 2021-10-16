import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Product } from 'src/app/models/sales/product';
import { SalesService } from 'src/app/services/sales/sales.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx'

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.page.html',
  styleUrls: ['./more-info.page.scss'],
})
export class MoreInfoPage implements OnInit {

  disapproval = {
    time: new Date().getTime(),
    date: new Date().toDateString(),
    category: 'Disapproved Sale Post',
    message: 'Your previous post has been deleted due to '
  }

  public product: Product;
  productId: string;
  userId: string;
  userEmail: string;
  userDetails;

  constructor(private activatedRoute: ActivatedRoute,
              private firestore: AngularFirestore,
              private alertCtrl: AlertController,
              private router: Router,
              private saleService: SalesService,
              private composer: EmailComposer) { }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');

    this.saleService.getProductDetail(this.productId).subscribe( productDetail => {
      this.product = productDetail;
      this.userId = productDetail['userId'];
      this.productId = productDetail['productId'];

      this.firestore.collection('users').doc(this.userId).valueChanges().subscribe( userDetail => {
        this.userDetails = userDetail;
        this.userEmail = userDetail['email'];
      });
    })
  }

  async approveBtn(productId: string, userId: string){
    const alert = await this.alertCtrl.create({
      header: 'Approve Post',
      message: 'Are you sure you want to approve this product post?',
      buttons: [
        {
          text: 'Yes',
          handler: () =>  {this.approvePost(productId, userId);
        }
        },
        {
          text: 'No'
        }
      ]
    });
    alert.present();
  }

  approvePost(productId: string, userId: string){
    this.firestore.collection('sale').doc(userId).collection('newProduct').doc(productId).update({
      adminApprove: 'Approved'
    });

    this.firestore.collection('productList').doc(productId).update({
      adminApprove: 'Approved'
    }).then( async success => {
      let alert = await this.alertCtrl.create({
        header: 'Approval Success',
        message: 'Product Post has been Approved. Thank you Admin for your respond.',
       buttons: [
          {text: 'OK',
          handler: () => this.router.navigate(['tab/new-product-post'])
        }]
      });
      alert.present();
    })
  }

  async disapproveBtn(productId: string, userId: string){
    const alert = await this.alertCtrl.create({
      header: 'Reject Request',
      message: 'Are you sure you want to disapprove this product post?',
      buttons: [
        {
          text: 'Yes',
          handler: () =>  this.disapprovePost(productId, userId),
        },
        {
          text: 'No'
        }
      ]
    });
    alert.present();
  }

  disapprovePost(productId: string, userId: string){
    this.firestore.collection('users').doc(userId).collection('notification').add(this.disapproval);
    this.firestore.collection('notification').doc(userId).set(this.disapproval);

    // this.firestore.collection('sale').doc(userId).collection('newProduct').doc(productId).update({
    //   adminApprove: 'Disapproved'
    // });

    // this.firestore.collection('productList').doc(productId).update({
    //   adminApprove: 'Disapproved'

    this.firestore.collection('sale').doc(userId).collection('newProduct').doc(productId).delete();

    this.firestore.collection('productList').doc(productId).delete()
    .then( async success => {
      let alert = await this.alertCtrl.create({
        header: 'Disapproved Post',
        message: 'Product Post has been disapproved and notified to the user. Thank you Admin for your respond.',
        buttons: [
          {text: 'OK',
          handler: () => this.router.navigate(['tab/new-product-post'])
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
