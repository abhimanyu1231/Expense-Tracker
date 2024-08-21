import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
declare var $: any;
@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
  expenseForm: FormGroup;
  isModalVisible = false;
  expenses: any[]=[];


  constructor(private fb: FormBuilder,private expenseService: ExpenseService) {
    this.expenseForm = this.fb.group({
      date: [null, [Validators.required]],
      category: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
  }

  showModal(): void {
    $('#expenseModal').modal('show');
  }

  hideModal(): void {
    $('#expenseModal').modal('hide');
  }

  addExpense(): void {
    if (this.expenseForm.valid) {
      const expense = this.expenseForm.value;
       this.expenseService.addItem(expense);
      this.hideModal();
      this.expenseForm.reset();
    }
  }

  handleCancel(): void {
    this.hideModal();
  }

  handleOk(): void {
    this.addExpense();
  }
  ngOnInit() {
    this.expenseService.getItems().subscribe(expenses => {
      this.expenses = expenses;
    });
  }
}
