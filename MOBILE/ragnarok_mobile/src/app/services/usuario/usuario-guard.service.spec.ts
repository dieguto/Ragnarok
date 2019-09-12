import { TestBed } from '@angular/core/testing';

import { UsuarioGuardService } from './usuario-guard.service';

describe('UsuarioGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuarioGuardService = TestBed.get(UsuarioGuardService);
    expect(service).toBeTruthy();
  });
});
