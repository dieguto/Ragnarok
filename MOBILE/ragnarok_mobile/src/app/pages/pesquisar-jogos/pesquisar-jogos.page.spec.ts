import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisarJogosPage } from './pesquisar-jogos.page';

describe('PesquisarJogosPage', () => {
  let component: PesquisarJogosPage;
  let fixture: ComponentFixture<PesquisarJogosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisarJogosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisarJogosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
