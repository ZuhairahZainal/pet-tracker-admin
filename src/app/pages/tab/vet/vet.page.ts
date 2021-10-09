import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { VET } from 'src/app/models/vet/vet';
import { VetService } from 'src/app/services/vet/vet.service';

@Component({
  selector: 'app-vet',
  templateUrl: './vet.page.html',
  styleUrls: ['./vet.page.scss'],
})
export class VetPage implements OnInit {

  public vetList: Observable<VET[]>;

  constructor(private vetService: VetService) {}

  ngOnInit() {
    this.vetList = this.vetService.getVetList();
  }

}
