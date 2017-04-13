/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CriarCupomService } from './criar-cupom.service';

describe('CriarCupomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CriarCupomService]
    });
  });

  it('should ...', inject([CriarCupomService], (service: CriarCupomService) => {
    expect(service).toBeTruthy();
  }));
});
