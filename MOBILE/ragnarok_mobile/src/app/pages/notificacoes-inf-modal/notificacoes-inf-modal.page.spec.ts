import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacoesInfModalPage } from './notificacoes-inf-modal.page';

describe('NotificacoesInfModalPage', () => {
  let component: NotificacoesInfModalPage;
  let fixture: ComponentFixture<NotificacoesInfModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacoesInfModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacoesInfModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
