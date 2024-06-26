import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeblockFormComponent } from './timeblock-form.component';

describe('TimeblockFormComponent', () => {
  let component: TimeblockFormComponent;
  let fixture: ComponentFixture<TimeblockFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeblockFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeblockFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
