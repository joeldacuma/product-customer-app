import { Validators } from '@angular/forms';

export interface CustomerModel {
  id: number;
  name: string;
  address: number;
  phone: string;
  memberSinceDate: string;
  isActive: boolean;
}

export const Customer = {
  name: ['', Validators.required],
  address: ['', Validators.required],
  phone: ['', Validators.required],
  memberSinceDate: ['', Validators.required],
  isActive: ['', Validators.required]
}