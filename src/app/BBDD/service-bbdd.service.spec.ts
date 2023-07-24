import { TestBed } from '@angular/core/testing';

import { ServiceBBDDService } from './service-bbdd.service';

describe('ServiceBBDDService', () => {
  let service: ServiceBBDDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceBBDDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
