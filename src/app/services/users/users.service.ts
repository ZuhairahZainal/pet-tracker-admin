import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/auth/user'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public firestore: AngularFirestore) {}

  getUserAccount(): Observable<User[]>{
    return this.firestore.collection<User>('users').valueChanges();
  }

  getUserDetails(userId: string): Observable<User> {
    return this.firestore.collection('users').doc<User>(userId).valueChanges();
  }
}
