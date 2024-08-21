import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private firestore:AngularFirestore) { }
  addItem(income: any) {
   income.id= this.firestore.createId();
   return this.firestore.collection('/Incomes').add(income);
  }
  getItems(): Observable<any[]> {
    return this.firestore.collection('/Incomes').valueChanges();
  }

  getLatestIncome() {
    return this.firestore.collection('/Incomes', ref => 
      ref.orderBy('date', 'desc').limit(1)
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }



  getMinimumIncome() {
    return this.firestore.collection('/Incomes', ref => 
      ref.orderBy('amount', 'asc').limit(1)
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getMaximumIncome() {
    return this.firestore.collection('/Incomes', ref => 
      ref.orderBy('amount', 'desc').limit(1)
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
}
