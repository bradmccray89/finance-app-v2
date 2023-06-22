import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
})
export class ExpenseListComponent {
  @Input() category: string = '';
  @Input() transactions: any[] = [];
  showTransactions: boolean = false;
  totalAmount: number = 0;
  numberOfTransactions: number = 0;
  averagePerTransaction: number = 0;

  constructor() {}

  ngOnChanges() {
    console.log(this.category);
    // get total amount of transactions for this category convert to positive number
    this.totalAmount = Math.abs(
      this.transactions.reduce((total: number, transaction: any) => {
        return total + transaction.amount;
      }, 0)
    );
    this.numberOfTransactions = this.transactions.length;
    this.averagePerTransaction = this.totalAmount / this.numberOfTransactions;
    if (this.transactions.length > 0) {
      console.log(this.totalAmount);
      console.log(this.numberOfTransactions);
      console.log(this.averagePerTransaction);
    }
  }

  toggleExpanded() {
    this.showTransactions = !this.showTransactions;
  }
}
