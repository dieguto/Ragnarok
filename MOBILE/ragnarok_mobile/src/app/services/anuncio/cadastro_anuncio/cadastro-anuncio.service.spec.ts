import { TestBed } from '@angular/core/testing';

import { CadastroAnuncioService } from './cadastro-anuncio.service';

describe('CadastroAnuncioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CadastroAnuncioService = TestBed.get(CadastroAnuncioService);
    expect(service).toBeTruthy();
  });
});
