import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeblockEditFormComponent } from './timeblock-edit-form.component';

describe('TimeblockEditFormComponent', () => {
  let component: TimeblockEditFormComponent;
  let fixture: ComponentFixture<TimeblockEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeblockEditFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeblockEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
