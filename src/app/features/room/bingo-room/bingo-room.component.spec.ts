import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoRoomComponent } from './bingo-room.component';

describe('BingoRoomComponent', () => {
  let component: BingoRoomComponent;
  let fixture: ComponentFixture<BingoRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BingoRoomComponent]
    });
    fixture = TestBed.createComponent(BingoRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
