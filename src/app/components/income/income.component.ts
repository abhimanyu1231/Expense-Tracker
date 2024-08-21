import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeService } from 'src/app/services/income.service';
declare var $: any;
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent {
  incomeForm: FormGroup;
  isModalVisible = false;
  incomes: any[]=[];


  constructor(private fb: FormBuilder,private incomeService: IncomeService) {
    this.incomeForm = this.fb.group({
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
    if (this.incomeForm.valid) {
      const expense = this.incomeForm.value;
       this.incomeService.addItem(expense);
      this.hideModal();
      this.incomeForm.reset();
    }
  }

  handleCancel(): void {
    this.hideModal();
  }

  handleOk(): void {
    this.addExpense();
  }
  ngOnInit() {
    this.incomeService.getItems().subscribe(incomes => {
      this.incomes = incomes;
    });
  }
}
