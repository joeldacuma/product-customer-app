import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import uid from 'uid';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore: AngularFirestore) { }

  getProducts() {
    return this.firestore.collection('products').snapshotChanges().pipe(
      map(changes => {
        return changes.map(
          doc => {
            return {
              id: doc.payload.doc.id,
              data: doc.payload.doc.data()
            }
          }
        )
      })
    );
  }

  addProduct(product) {
    return this.firestore.collection('products').doc(uid()).set(product);
  }

  updateProduct(docId, body) {
    return this.firestore.collection('products').doc(docId).update(body);
  }
  
  deleteProduct(docId) {
    return this.firestore.collection('products').doc(docId).delete();
  }
}
