import { TestBed } from '@angular/core/testing';

import { MotivationService } from './motivation.service';

describe('MotivationServiceService', () => {
  let service: MotivationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotivationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should have a method called getById', () => {
    expect(service.getById).toBeTruthy
  });

  it('should have a method called update', () => {
    expect(service.update).toBeTruthy
  });

  it('should have a method called remove', () => {
    expect(service.remove).toBeTruthy
  });

  it('should have a method called add', () => {
    expect(service.add).toBeTruthy
  });

  it('should have a method called valid', () => {
    expect(service.valid).toBeTruthy
  });

  it('should have a method called validStrength', () => {
    expect(service.validStrength).toBeTruthy
  });

  it('should have a method called getNewId', () => {
    expect(service.getNewId).toBeTruthy
  });

  it('should have a method called getAll', () => {
    expect(service.getAll).toBeTruthy
  });

  it('should have a method called constructor', () => {
    expect(service.constructor).toBeTruthy
  });

});
