import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../api/products.service';
import { SelectionModel } from '@angular/cdk/collections';

import { ProductModel } from '../../models/product.model';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ProductComponent } from '../../components/product/product.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public data: any;
  public allData: any;
  public displayedColumns: string[] = ['select',
                                       'id',
                                       'edit',
                                       'name',
                                       'price',
                                       'manufactureDate',
                                       'location',
                                       'isAvailable',
                                       'delete'];
  public selection = new SelectionModel<ProductModel>(true, []);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public itemWarehouseGroup = [];
  public itemDeliveryGroup = [];
  public title = 'Product List';

  constructor(public productService: ProductsService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any) => {
        const array = [];
        data.map(res => {
          res.data.docId = res.id;
          array.push(res.data);
        });
        this.data = new MatTableDataSource<ProductModel>(array);
        this.data.paginator = this.paginator;
        this.data.sort = this.sort;
        this.allData = this.data;
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data?.data?.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.data.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: ProductModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  deleteProduct(row) {
    this.productService.deleteProduct(row.docId);
  }

  editProduct(row) {
    const dialogRef = this.dialog.open(ProductComponent, {
      width: '800px',
      height: '250px',
      data: {message: 'Edit Product', value: row }
    });
  }

  searchFilter(event) {
    if (event) {
      const dataArr = this.data.data.filter(res => res.name.toLowerCase().includes(event.toLowerCase()));
      this.data = new MatTableDataSource<ProductModel>(dataArr);
    } else {
      this.data = this.allData;
    }
  }

  addToWarehouse() {
    const arr = [];
    if(this.selection.selected.length > 0) {
      this.selection.selected.map(res => {
        arr.push(res);
      });

      this.itemWarehouseGroup = arr;
      console.log(this.itemWarehouseGroup);
    }
  }

  addToDelivery() {
    const arr = [];
    if(this.selection.selected.length > 0) {
      this.selection.selected.map(res => {
        arr.push(res);
      });

      this.itemDeliveryGroup = arr;
      console.log(this.itemDeliveryGroup);
    }
  }

}
