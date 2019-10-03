import { TestBed } from '@angular/core/testing';

import { SugestoesJogoService } from './sugestoes-jogo.service';

describe('SugestoesJogoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SugestoesJogoService = TestBed.get(SugestoesJogoService);
    expect(service).toBeTruthy();
  });
});
