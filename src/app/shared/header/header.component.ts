import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ProductComponent } from '../../components/product/product.component';
import { CustomerComponent } from '../../components/customer/customer.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public searchValue: any;
  @Output() onSearch = new EventEmitter<any>();
  @Input() public title: any;

  constructor(public dialog: MatDialog,
              public router: Router) { }

  ngOnInit(): void {}

  add(): void {
    if (this.router.url === '/home') {
      const dialogRef = this.dialog.open(ProductComponent, {
        width: '800px',
        height: '250px',
        data: {message: 'Add Product', value: ''}
      });
    } else {
      const dialogRef = this.dialog.open(CustomerComponent, {
        width: '800px',
        height: '250px',
        data: {message: 'Add Customer', value: ''}
      });
    }
  }

  triggerSearch() {
    this.onSearch.emit(this.searchValue);
  }

  doFilter(event) {
    this.onSearch.emit(event);
  }
}
