import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { VET } from 'src/app/models/vet/vet';

@Injectable({
  providedIn: 'root'
})
export class VetService {


  constructor(private firestore: AngularFirestore,
              private router: Router) {}


  // vet List
  getVetList(): Observable<VET[]> {
    return this.firestore.collection<VET>(`vet`, ref => ref.orderBy('time', 'desc')).valueChanges();
  }

  getVetDetail(vetId: string): Observable<VET> {
    return this.firestore.collection('vet').doc<VET>(vetId).valueChanges();
  }

    // Update adoption details
    updateVetDetail(vetId, newVetDetail) {
      this.firestore.collection('vet').doc(vetId).update(newVetDetail)

      .then(() => {
        this.router.navigate(['tab/vet/vet-detail/', vetId]);
      }).catch(error => console.log(error));
    }

}
