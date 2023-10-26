import { Component, OnInit } from '@angular/core';
import { order } from 'src/app/dataType';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent {


  orderData: order[] | undefined
  constructor(private product: ProductService) { }


  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(orderId: number | undefined) {
    orderId && this.product.cancelOrder(orderId).subscribe((result) => {
      this.getOrderList();
    })
    window.location.reload();
  }

  getOrderList() {
    this.product.orderList().subscribe((result) => {
      this.orderData = result
    })
  }


}
