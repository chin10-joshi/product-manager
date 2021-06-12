import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComponentDialogComponent } from './component-dialog.component';

describe('ComponentDialogComponent', () => {
  let component: ComponentDialogComponent;
  let fixture: ComponentFixture<ComponentDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
