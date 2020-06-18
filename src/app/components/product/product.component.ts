import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Product } from '../../models/product.model';
import { ProductsService } from '../../api/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public productForm: FormGroup;
  public idCount: any;

  constructor(public dialogRef: MatDialogRef<ProductComponent>,
              public formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public productsService: ProductsService) {
    this.productForm = this.formBuilder.group(Product);
  }

  ngOnInit(): void {
    const data = this.data.value;
    this.productForm.get('name').patchValue(data.name);
    this.productForm.get('price').patchValue(data.price);
    this.productForm.get('manufactureDate').patchValue(data.manufactureDate);
    this.productForm.get('location').patchValue(data.location);
    this.productForm.get('isAvailable').patchValue(data.isAvailable);
    this.getTotalProducts();
  }

  getTotalProducts() {
    this.productsService.getProducts().subscribe(data => {
      const totalArray = data.map((res, index) => {
        return res.data;
      }).sort((a: any, b: any) => a.id - b.id);
      
      const arrayObj = totalArray.slice(-1)[0];
      this.idCount = arrayObj;
    });
  }

  submit() {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      product.id = (this.idCount) ? this.idCount.id + 1 : 1;
      this.productsService.addProduct(product).then(result => {
        this.close();
        this.idCount = 0;
      });
    }
  }

  update() {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      product.id = this.data.value.id;
      this.productsService.updateProduct(this.data.value.docId, product).then(res => {
        this.close();
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
