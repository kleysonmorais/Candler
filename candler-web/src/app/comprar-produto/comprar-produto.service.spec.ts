/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ComprarProdutoService } from './comprar-produto.service';

describe('ComprarProdutoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComprarProdutoService]
    });
  });

  it('should ...', inject([ComprarProdutoService], (service: ComprarProdutoService) => {
    expect(service).toBeTruthy();
  }));
});
