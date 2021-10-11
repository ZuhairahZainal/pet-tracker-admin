import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/sales/product';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(public firestore: AngularFirestore) {}

  getUserProduct(): Observable<Product[]>{
    return this.firestore.collection<Product>('productList', ref => ref.orderBy('time', 'desc')).valueChanges();
  }

  getProductDetail(productId: string): Observable<Product> {
    return this.firestore.collection('productList').doc<Product>(productId).valueChanges();
  }

}
