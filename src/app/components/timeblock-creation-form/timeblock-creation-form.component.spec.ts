import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeblockCreationFormComponent } from './timeblock-creation-form.component';

describe('TimeblockCreationFormComponent', () => {
  let component: TimeblockCreationFormComponent;
  let fixture: ComponentFixture<TimeblockCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeblockCreationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeblockCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
