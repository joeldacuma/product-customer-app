import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Customer } from '../../models/customer';
import { CustomersService } from '../../api/customers.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  public customerForm: FormGroup;
  public idCount: any;

  constructor(public dialogRef: MatDialogRef<CustomerComponent>,
              public formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public customerService: CustomersService) { 
                this.customerForm = this.formBuilder.group(Customer);
              }

  ngOnInit(): void {
    const data = this.data.value;
    this.customerForm.get('name').patchValue(data.name);
    this.customerForm.get('address').patchValue(data.address);
    this.customerForm.get('phone').patchValue(data.phone);
    this.customerForm.get('memberSinceDate').patchValue(data.memberSinceDate);
    this.customerForm.get('isActive').patchValue(data.isActive);
    this.getTotalCustomers();
  }
            
  getTotalCustomers() {
    this.customerService.getCustomers().subscribe(data => {
      const totalArray = data.map((res, index) => {
        return res.data;
      }).sort((a: any, b: any) => a.id - b.id);
      
      const arrayObj = totalArray.slice(-1)[0];
      this.idCount = arrayObj;
    });
  }
            
  submit() {
    if (this.customerForm.valid) {
      const customer = this.customerForm.value;
      customer.id = (this.idCount) ? this.idCount.id + 1 : 1;
      this.customerService.addCustomer(customer).then(result => {
        this.close();
        this.idCount = 0;
      });
    }
  }
            
  update() {
    if (this.customerForm.valid) {
      const customer = this.customerForm.value;
      customer.id = this.data.value.id;
      this.customerService.updateCustomer(this.data.value.docId, customer).then(res => {
        this.close();
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

}
