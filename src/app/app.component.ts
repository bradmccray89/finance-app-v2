import { Component, signal } from '@angular/core';
interface ITransaction {
  name: string;
  nickname: string;
  date: Date;
  amount: number;
  category: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'finance-app';
  financeData: ITransaction[] = [];
  categorizedFinanceData: ITransaction[] = [];
  file: any = null;
  categories: string[] = [
    'Groceries',
    'Restaurants',
    'Gas',
    'Entertainment',
    'Shopping',
    'Travel',
    'Health',
    'Bills',
    'Other',
  ];
  showNewCategoryModal: boolean = false;
  newCategoryName: string = '';
  currentTransaction: ITransaction | null = null;

  uploadFile(event: any) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
    if (this.file && this.file.type !== 'text/csv') {
      return;
    }
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.parseFinanceData(fileReader.result);
    };
    fileReader.readAsText(this.file);
  }

  parseFinanceData(data: any) {
    let transactionList: [] = data.split('\n');
    const updatedList: ITransaction[] = [];
    transactionList.forEach((transaction: any, index: number) => {
      if (!transaction) return;
      // split and remove quotes
      let transactionData = transaction.split(',').map((item: any) => {
        return item.replace(/['"]+/g, '');
      });
      let transactionObject = {
        date: new Date(transactionData[0]),
        amount: +transactionData[1],
        name: String(transactionData[4]),
        nickname: String(transactionData[5] || ''),
        category: String(transactionData[6] || ''),
      };
      updatedList.push(transactionObject);
    });
    this.financeData = updatedList;
    this.currentTransaction = this.financeData[0];
  }

  clearFinanceData() {
    this.financeData = [];
    this.file = null;
    // clear file input
    let fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.value = '';
    console.log('Clear Finance Data', fileInput);
  }

  addNewCategory() {
    console.log('Add New Category', this.newCategoryName);
    this.categories.push(this.newCategoryName);
    this.newCategoryName = '';
    this.showNewCategoryModal = false;
  }

  assignCategory(category: string) {
    console.log('Assign Category', category, this.currentTransaction?.name);
    if (!this.currentTransaction) return;
    this.currentTransaction.category = category;
    this.categorizedFinanceData.push(this.currentTransaction);
    this.financeData.shift();
    this.currentTransaction = this.financeData[0];
    console.log('Categorized Finance Data', this.categorizedFinanceData);
  }
}
