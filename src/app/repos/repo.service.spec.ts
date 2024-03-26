import { TestBed } from '@angular/core/testing';

import { RepoService } from './repo.service';

describe('RepoService', () => {
  let service: RepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a method called remove', () => {
    expect(service.remove).toBeTruthy
    service.remove(1)
    try {
      service.getAll().findIndex( x=> x.id===1 )
    } catch (e) {
      expect(e).toBeTruthy
    }
  });

  it('should have a method called add', () => {
    expect(service.add).toBeTruthy
    let motivation={id:5, name:"To show the world what Im made of", strength:1.2}
    service.add(motivation)
    expect(service.getAll().findIndex( x=> x.id===5 )).toBeTruthy()
  });
  it('should have a method called remove', () => {
    expect(service.remove).toBeTruthy
    let motivation={id:5, name:"To show the world what Im made of", strength:1.2}
    service.remove(motivation.id)
    expect(service.getAll().find(x=>x.id===motivation.id)).toBeFalsy()
  });

  it('should have a method called getAll', () => {
    expect(service.getAll).toBeTruthy
    service.getAll().forEach(x=>expect(x).toBeTruthy())
    service.getAll()===service.list
  });

  it('should have a method called constructor', () => {
    expect(service.constructor).toBeTruthy
  });
});
