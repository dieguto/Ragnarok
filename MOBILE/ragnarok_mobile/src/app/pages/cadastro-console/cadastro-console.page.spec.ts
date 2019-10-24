import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroConsolePage } from './cadastro-console.page';

describe('CadastroConsolePage', () => {
  let component: CadastroConsolePage;
  let fixture: ComponentFixture<CadastroConsolePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroConsolePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroConsolePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
