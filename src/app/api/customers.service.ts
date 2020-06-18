import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import uid from 'uid';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private firestore: AngularFirestore) { }

  getCustomers() {
    return this.firestore.collection('customers').snapshotChanges().pipe(
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

  addCustomer(customer) {
    return this.firestore.collection('customers').doc(uid()).set(customer);
  }

  updateCustomer(docId, body) {
    return this.firestore.collection('customers').doc(docId).update(body);
  }
  
  deleteCustomer(docId) {
    return this.firestore.collection('customers').doc(docId).delete();
  }

}
