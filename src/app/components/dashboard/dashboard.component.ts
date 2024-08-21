import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ExpenseService } from 'src/app/services/expense.service';
import { IncomeService } from 'src/app/services/income.service';

Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  stats: any;
  gridStyle = { width: '25%', textAlign: 'center' };
  
 
  
  incomes: any[] = [];
  expenses: any[] = [];
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;
  latestIncome:any;
  latestExpense:any;
  private incomeChart!: Chart;
  private expenseChart!: Chart;
  minimumIncome: any;
  maximumIncome: any;
  minimumExpense: any;
  maximumExpense: any;

  constructor(private incomeService: IncomeService, private expenseService: ExpenseService) {
    
  }

  ngOnInit() {
    this.incomeService.getItems().subscribe(incomes => {
      this.incomes = incomes;
      this.calculateTotalIncome();
      this.calculateBalance();
      this.getLatestIncomeAndExpense();
      console.log('Incomes:', this.incomes); 
      
      if (this.incomes && this.incomes.length > 0) {
        this.createIncomeChart();
      }
      
      
    });

    this.expenseService.getItems().subscribe(expenses => {
      this.expenses = expenses;
      this.calculateTotalExpense();
      this.calculateBalance();
      console.log('Expenses:', this.expenses); 
      if (this.expenses && this.expenses.length > 0) {
        this.createExpenseChart();
      }
      
    });
    this.getMinimumIncome();
    this.getMaximumIncome();
    this.getMaximumExpense();
    this.getMinimumExpense();

  
  }


  calculateTotalIncome(): void {
    this.totalIncome = this.incomes.reduce((sum, income) => sum + income.amount, 0);
  }

  calculateTotalExpense(): void {
    this.totalExpense = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  calculateBalance(): void {
    this.balance = this.totalIncome - this.totalExpense;
  }
  getLatestIncomeAndExpense() {
    this.incomeService.getLatestIncome().subscribe(income => {
    this.latestIncome=income[0];
    });
    this.expenseService.getLatestExpense().subscribe(expense => {
      if (expense && expense.length > 0) {
        this.latestExpense = expense[0];
        console.log('Latest Expense:', this.latestExpense); 
      } else {
        console.log('No expenses found.');
      }
    });
  }
 
  getMinimumIncome() {
    this.incomeService.getMinimumIncome().subscribe(income => {
      if (income && income.length > 0) {
        this.minimumIncome = income[0];
        console.log('Minimum Income:', this.minimumIncome);
      }
    });
  }

  getMaximumIncome() {
    this.incomeService.getMaximumIncome().subscribe(income => {
      if (income && income.length > 0) {
        this.maximumIncome = income[0];
        console.log('Maximum Income:', this.maximumIncome);
      }
    });
  }

  getMinimumExpense() {
    this.expenseService.getMinimumExpense().subscribe(expense => {
      if (expense && expense.length > 0) {
        this.minimumExpense = expense[0];
        console.log('Minimum Income:', this.minimumIncome);
      }
    });
  }

  getMaximumExpense() {
    this.expenseService.getMaximumExpense().subscribe(expense => {
      if (expense && expense.length > 0) {
        this.maximumExpense = expense[0];
        console.log('Maximum Income:', this.maximumIncome);
      }
    });
  }
  createIncomeChart(): void {
    const ctx = document.getElementById('myIncomeChart') as HTMLCanvasElement;
  const myIncomeChart = new Chart(ctx, {
    type: 'line', 
    data: {
      labels: this.incomes.map(income => income.date),
      datasets: [{
        label: 'Income',
        data: this.incomes.map(income => income.amount),
        borderWidth: 1,
        backgroundColor: 'rgba(80, 180, 120, 0.5)',
        borderColor: 'rgb(0, 100, 0)',
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }); 
}
createExpenseChart(): void {
  const ctxE = document.getElementById('myExpenseChart') as HTMLCanvasElement;
  const myExpenseChart = new Chart(ctxE, {
    type: 'line',
    data: {
      labels: this.expenses.map(expense => expense.date),
      datasets: [{
        label: 'Expense',
        data: this.expenses.map(expense => expense.amount),
        borderWidth: 1,
        backgroundColor: 'rgba(255, 99, 132, 0.5)', 
        borderColor: 'rgb(255, 99, 132)',
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

}


