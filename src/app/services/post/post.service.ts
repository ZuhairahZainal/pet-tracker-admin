import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Feed, DonationPost, LostPetPost } from 'src/app/models/post/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private firestore: AngularFirestore) { }

    // Feed post
    getFeedPost(): Observable<Feed[]> {
      return this.firestore.collection<Feed>(`feedPost`).valueChanges();
    }

    getFeedDetail(feedId: string): Observable<Feed> {
      return this.firestore.collection('feedPost').doc<Feed>(feedId).valueChanges();
    }

    // Lost Pet post
    getLostPetPost(): Observable<LostPetPost[]> {
      return this.firestore.collection<LostPetPost>(`lostPetPost`).valueChanges();
    }

    getLostPetDetail(lostPetId: string): Observable<LostPetPost> {
      return this.firestore.collection('lostPetPost').doc<LostPetPost>(lostPetId).valueChanges();
    }

    // Donation post
    getDonationPost(): Observable<DonationPost[]> {
      return this.firestore.collection<DonationPost>(`donationPost`).valueChanges();
    }

    getDonationDetail(donationId: string): Observable<DonationPost> {
      return this.firestore.collection('donationPost').doc<DonationPost>(donationId).valueChanges();
    }

}
