import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalotaListComponent } from './balota-list.component';

describe('BalotaListComponent', () => {
  let component: BalotaListComponent;
  let fixture: ComponentFixture<BalotaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BalotaListComponent]
    });
    fixture = TestBed.createComponent(BalotaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
