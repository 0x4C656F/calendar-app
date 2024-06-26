import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeblockDataComponent } from './timeblock-data.component';

describe('TimeblockDataComponent', () => {
  let component: TimeblockDataComponent;
  let fixture: ComponentFixture<TimeblockDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeblockDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeblockDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
