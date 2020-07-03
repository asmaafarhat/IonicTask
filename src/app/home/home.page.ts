import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Product } from '../services/product';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  products: Product[] = [];
  pageData = {
    items_per_page: 24,
    page: 0
  }
  constructor(public api: ApiService,) {
    this.getAll(this.pageData);
  }

  getAll(pageData) {
    this.api.getProducts(pageData)
      .subscribe(res => {
        this.products.push(...res['list']);
        console.log(this.products);
      }, err => {
        console.log(err);
      });
  }
  loadData(event) {
    this.pageData.page++;
    setTimeout(() => {
      this.getAll(this.pageData)
      console.log('Done');
      event.target.complete();
    }, 2000);
  }
}