import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacoesPage } from './notificacoes.page';

describe('NotificacoesPage', () => {
  let component: NotificacoesPage;
  let fixture: ComponentFixture<NotificacoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacoesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
