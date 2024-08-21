import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Expense } from '../models/expenses';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private firestore:AngularFirestore) { }
  addItem(expense: Expense) {
   expense.id= this.firestore.createId();
   return this.firestore.collection('/Expenses').add(expense);
  }
  getItems(): Observable<any[]> {
    return this.firestore.collection('/Expenses').valueChanges();
  }
  getLatestExpense() {
    return this.firestore.collection('/Expenses', ref => 
      ref.orderBy('date', 'desc').limit(1)
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  getMinimumExpense() {
    return this.firestore.collection('/Expenses', ref => 
      ref.orderBy('amount', 'asc').limit(1)
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getMaximumExpense() {
    return this.firestore.collection('/Expenses', ref => 
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
