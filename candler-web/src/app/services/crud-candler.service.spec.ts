/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CrudCandlerService } from './crud-candler.service';

describe('CrudCandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrudCandlerService]
    });
  });

  it('should ...', inject([CrudCandlerService], (service: CrudCandlerService) => {
    expect(service).toBeTruthy();
  }));
});
