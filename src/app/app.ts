import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserList } from './user/user-list/user-list';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserList, CurrencyPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly title = 'my-app';
  price = 10.00;
  quantity = signal(1);
  totalPrice = computed(() => this.price * this.quantity());

  changeQuantity(newQuantity: number) {
    this.quantity.set(newQuantity);
  }

  products = signal(
    [
      { id: 1, name: 'Apple', price: 10.00 },
      { id: 2, name: 'Banana', price: 20.00 },
      { id: 3, name: 'Pumpkin', price: 30.00 }
    ]
  );

  filterName = signal('');
  filteredProducts = computed(() => {
    const filter = this.filterName().toLowerCase();
    return this.products().filter(product => product.name.toLowerCase().includes(filter));
  });

  updateFilterName(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const newFilter = inputElement.value;
    this.filterName.set(newFilter);
  }
}
