import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';

import { NgIconsModule } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { heroPlus } from '@ng-icons/heroicons/outline';
import { heroChevronDown } from '@ng-icons/heroicons/outline';

const icons = {
  heroXMark,
  heroPlus,
  heroChevronDown,
};

@NgModule({
  declarations: [AppComponent, ExpenseListComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons(icons),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
