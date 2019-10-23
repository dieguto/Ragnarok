import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoTipoAnuncioPage } from './selecao-tipo-anuncio.page';

describe('SelecaoTipoAnuncioPage', () => {
  let component: SelecaoTipoAnuncioPage;
  let fixture: ComponentFixture<SelecaoTipoAnuncioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecaoTipoAnuncioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecaoTipoAnuncioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
