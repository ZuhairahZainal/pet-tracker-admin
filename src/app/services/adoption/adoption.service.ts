import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Adoption } from 'src/app/models/adoption/adoption';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {

  constructor(private firestore: AngularFirestore) { }

  // adoption post
  getAdoptionPost(): Observable<Adoption[]> {
    return this.firestore.collection<Adoption>(`adoptionPost`, ref => ref.orderBy('time', 'desc')).valueChanges();
  }

  getAdoptionDetail(adoptionId: string): Observable<Adoption> {
    return this.firestore.collection('adoptionPost').doc<Adoption>(adoptionId).valueChanges();
  }

}
