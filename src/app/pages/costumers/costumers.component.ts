import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomersService } from '../../api/customers.service';
import { SelectionModel } from '@angular/cdk/collections';

import { CustomerModel } from '../../models/customer';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import { CustomerComponent } from '../../components/customer/customer.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-costumers',
  templateUrl: './costumers.component.html',
  styleUrls: ['./costumers.component.scss']
})
export class CostumersComponent implements OnInit {

  public title = 'Customer List';
  public data: any;
  public allData: any;
  public displayedColumns: string[] = ['select',
                                       'id',
                                       'edit',
                                       'name',
                                       'address',
                                       'phone',
                                       'memberSinceDate',
                                       'isActive',
                                       'delete'];
  public selection = new SelectionModel<CustomerModel>(true, []);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public memberPremiumGroup = [];
  public memberRegularGroup = [];

  constructor(public customerService: CustomersService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((data: any) => {
        const array = [];
        data.map(res => {
          res.data.docId = res.id;
          array.push(res.data);
        });
        this.data = new MatTableDataSource<CustomerModel>(array);
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

  checkboxLabel(row?: CustomerModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  deleteCustomer(row) {
    this.customerService.deleteCustomer(row.docId);
  }

  editCustomer(row) {
    const dialogRef = this.dialog.open(CustomerComponent, {
      width: '800px',
      height: '250px',
      data: {message: 'Edit Customer', value: row }
    });
  }

  searchFilter(event) {
    if (event) {
      const dataArr = this.data.data.filter(res => res.name.toLowerCase().includes(event.toLowerCase()));
      this.data = new MatTableDataSource<CustomerModel>(dataArr);
    } else {
      this.data = this.allData;
    }
  }

  addmemberVIP() {
    const arr = [];
    if(this.selection.selected.length > 0) {
      this.selection.selected.map(res => {
        arr.push(res);
      });

      this.memberPremiumGroup = arr;
    }
  }

  addmemberRegular() {
    const arr = [];
    if(this.selection.selected.length > 0) {
      this.selection.selected.map(res => {
        arr.push(res);
      });

      this.memberRegularGroup = arr;
    }
  }

}
