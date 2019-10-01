import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAnuncioPage } from './cadastro-anuncio.page';

describe('CadastroAnuncioPage', () => {
  let component: CadastroAnuncioPage;
  let fixture: ComponentFixture<CadastroAnuncioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroAnuncioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroAnuncioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
