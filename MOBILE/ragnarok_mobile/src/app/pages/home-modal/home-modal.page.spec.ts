import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeModalPage } from './home-modal.page';

describe('HomeModalPage', () => {
  let component: HomeModalPage;
  let fixture: ComponentFixture<HomeModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
