import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkStatusCheckerComponent } from './network-status-checker.component';

describe('NetworkStatusCheckerComponent', () => {
  let component: NetworkStatusCheckerComponent;
  let fixture: ComponentFixture<NetworkStatusCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkStatusCheckerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NetworkStatusCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
