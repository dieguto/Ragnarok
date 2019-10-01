import { TestBed } from '@angular/core/testing';

import { GeneroJogoService } from './genero-jogo.service';

describe('GeneroJogoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneroJogoService = TestBed.get(GeneroJogoService);
    expect(service).toBeTruthy();
  });
});
