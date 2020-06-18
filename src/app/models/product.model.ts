import { Validators } from '@angular/forms';

export interface ProductModel {
  id: number;
  name: string;
  price: number;
  manufactureDate: string;
  location: string;
  isAvailable: boolean;
}

export const Product = {
  name: ['', Validators.required],
  price: ['', Validators.required],
  manufactureDate: ['', Validators.required],
  location: ['', Validators.required],
  isAvailable: ['', Validators.required]
}
