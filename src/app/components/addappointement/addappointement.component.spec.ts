import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddappointementComponent } from './addappointement.component';

describe('AddappointementComponent', () => {
  let component: AddappointementComponent;
  let fixture: ComponentFixture<AddappointementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddappointementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddappointementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
