import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JogoPesquisaModalPage } from './jogo-pesquisa-modal.page';

describe('JogoPesquisaModalPage', () => {
  let component: JogoPesquisaModalPage;
  let fixture: ComponentFixture<JogoPesquisaModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JogoPesquisaModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JogoPesquisaModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
