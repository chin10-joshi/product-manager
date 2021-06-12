import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareProductComponent } from './prepare-product.component';

describe('PrepareProductComponent', () => {
  let component: PrepareProductComponent;
  let fixture: ComponentFixture<PrepareProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepareProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepareProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
