import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {

  constructor(private firestore: AngularFirestore) { }

  fetchAdoptionDetails(){
    // get user adoption details from firestore
    return this.firestore.collection('adoptionList');
  }

}
