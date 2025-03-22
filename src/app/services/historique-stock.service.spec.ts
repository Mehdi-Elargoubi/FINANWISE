import { TestBed } from '@angular/core/testing';

import { HistoriqueStockService } from './historique-stock.service';

describe('HistoriqueStockService', () => {
  let service: HistoriqueStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoriqueStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
