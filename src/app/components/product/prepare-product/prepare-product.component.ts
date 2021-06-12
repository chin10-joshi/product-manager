import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-prepare-product',
  templateUrl: './prepare-product.component.html',
  styleUrls: ['./prepare-product.component.scss']
})
export class PrepareProductComponent implements OnInit {

  formType: string = 'Create'; 
  form!: FormGroup;
  callback!: ReplaySubject<any>;
  @Input('data') data: any;
  productID: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.prepareForm();
    this.getDialogData();
  }

  getDialogData() {
    const { callback, productID, productDetails } = this.data;
    if (callback) {
      this.callback = callback;
    }
    if (productID && productID > 0) {
      this.productID = productID;
      if (productDetails) {
        this.form.patchValue(productDetails);
        this.formType = 'Update';
      }
    }

  }

  onCancel() {
    this.callback.next(null)
  }
  onSubmit() {
    this.callback.next({id: this.productID, ...this.form.getRawValue()})
  }

  prepareForm() {
    this.form = new FormGroup({
      productID: new FormControl(this.productID, Validators.required),
      title: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }
}
