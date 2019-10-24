import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAcessorioPage } from './cadastro-acessorio.page';

describe('CadastroAcessorioPage', () => {
  let component: CadastroAcessorioPage;
  let fixture: ComponentFixture<CadastroAcessorioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroAcessorioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroAcessorioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
