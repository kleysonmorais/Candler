/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CrudEmpresaService } from './crud-empresa.service';

describe('CrudEmpresaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrudEmpresaService]
    });
  });

  it('should ...', inject([CrudEmpresaService], (service: CrudEmpresaService) => {
    expect(service).toBeTruthy();
  }));
});
