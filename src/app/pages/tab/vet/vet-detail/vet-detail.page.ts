import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { VET } from 'src/app/models/vet/vet';
import { VetService } from 'src/app/services/vet/vet.service';

@Component({
  selector: 'app-vet-detail',
  templateUrl: './vet-detail.page.html',
  styleUrls: ['./vet-detail.page.scss'],
})
export class VetDetailPage implements OnInit {

  vetId: string;
  public vet: VET;

  constructor(private activatedRoute: ActivatedRoute,
              private firestore: AngularFirestore,
              private alertCtrl: AlertController,
              private router: Router,
              private vetService: VetService) { }

  ngOnInit() {
    this.vetId = this.activatedRoute.snapshot.paramMap.get('id');

    this.vetService.getVetDetail(this.vetId).subscribe( vetDetails => {
      this.vet = vetDetails;
    });
  }

  deleteInfo(vetId: string){
    this.firestore.doc('vet/' + vetId).delete().then(() => {
      this.router.navigate(['tab/vet']);
    })
  }

  async removeVetDetail(vetId: string) {
    const alert = await this.alertCtrl.create({
      header: 'Remove Vet',
      message: 'Are you sure you want to delete this vet information?',
      buttons: [
        {
          text: 'Yes',
          handler: () => this.deleteInfo(vetId),
        },
        {
          text: 'No',
        },
      ],
    });

    alert.present();
  }

}
