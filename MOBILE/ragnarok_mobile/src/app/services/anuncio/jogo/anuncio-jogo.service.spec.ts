import { TestBed } from '@angular/core/testing';

import { AnuncioJogoService } from './anuncio-jogo.service';

describe('AnuncioJogoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnuncioJogoService = TestBed.get(AnuncioJogoService);
    expect(service).toBeTruthy();
  });
});
