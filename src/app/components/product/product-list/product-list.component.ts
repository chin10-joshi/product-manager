import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductDetails } from 'src/app/shared/interfaces/product';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { PrepareProductComponent } from '../prepare-product/prepare-product.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  private destroy$ = new Subject();
  productList: Array<ProductDetails> = [];
  searchedProductList: Array<ProductDetails> = [];
  @ViewChild('productTable') productTable!: MatTable<any>;
  searchControl: FormControl = new FormControl();
  
  constructor(private httpService: HttpService, private commonService: CommonService) { } 

  ngOnInit(): void {
    this.updateProductList();
    this.subscribeSearchControl();
  }

  subscribeSearchControl() {
    this.searchControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(searchValue => {
      if (searchValue) {
        this.searchedProductList = this.productList.filter((product: ProductDetails) => product.title.startsWith(searchValue));
        if (this.productTable) {
          this.productTable.renderRows();
        }
      } else {
        this.searchedProductList = this.productList;
      }
    })
  }

  updateProductList() {
    this.httpService.get<Array<ProductDetails>>('products').pipe(takeUntil(this.destroy$)).subscribe((res: Array<ProductDetails>) => {
      if (res && res.length) {
        this.searchedProductList = this.productList = res;
      }
    })
  }

  createOrEditProduct(productID: number = 0, productDetails: ProductDetails | null = null) {
    this.commonService.showComponentDialog({
      width: "400px",
      data: {
        data: { productID, productDetails },
        component: PrepareProductComponent
      }
    }).afterClosed().pipe(takeUntil(this.destroy$)).subscribe(data => {
      if (data) {
        const {title, price, description, image, category} = data;

        let payload: ProductDetails = {
          title, price: parseInt(price), description, image: 'https://i.pravatar.cc', category
      }
        this.httpService.put<any>(`products/${productID}`, payload).pipe(takeUntil(this.destroy$)).subscribe((res) => {
          let updatedProductIndex = this.searchedProductList.findIndex((product : ProductDetails) => product.id == productID);
          if (updatedProductIndex > -1) {
            this.searchedProductList[updatedProductIndex] = res;
            let indexFromAllList = this.productList.findIndex((product : ProductDetails) => product.id == productID);
            this.productList[indexFromAllList] = res;

          } else {
            this.searchedProductList.push(res);
          }
          if (this.productTable) {
            this.productTable.renderRows();
          }
        })
      }
    });
  }
}
