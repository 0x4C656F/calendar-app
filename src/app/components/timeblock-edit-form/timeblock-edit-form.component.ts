import { Component, input, output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  TimeblockService,
  CreateTimeBlockDto,
  TimeBlock,
} from '../../services/timeblock.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TimeblockFormComponent } from '../timeblock-form/timeblock-form.component';

@Component({
  selector: 'timeblock-edit-form',
  standalone: true,
  imports: [
    TimeblockFormComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './timeblock-edit-form.component.html',
  styleUrl: './timeblock-edit-form.component.css',
})
export class TimeblockEditFormComponent {
  selectedDate = input.required<Date>();
  timeblock = input.required<TimeBlock>();
  setTimeblock = output<TimeBlock>();

  eventForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private timeblockService: TimeblockService
  ) {
    this.eventForm = this.fb.group(
      {
        fromTime: ['', [Validators.required, this.timeValidator]],
        toTime: ['', [Validators.required, this.timeValidator]],
        title: ['', Validators.required],
        content: ['', Validators.required],
      },
      { validators: this.timeRangeValidator }
    );
  }

  timeValidator(control: AbstractControl): ValidationErrors | null {
    const time = control.value;
    if (!time) {
      return null;
    }
    const [hours, minutes] = time.split(':').map(Number);
    if (hours < 8 || hours > 19 || (hours === 19 && minutes > 0)) {
      return { invalidTime: true };
    }
    return null;
  }

  timeRangeValidator(group: FormGroup): ValidationErrors | null {
    const fromTime = group.get('fromTime')?.value;
    const toTime = group.get('toTime')?.value;
    if (!fromTime || !toTime) {
      return null;
    }
    if (fromTime >= toTime) {
      return { invalidTimeRange: true };
    }
    return null;
  }
  submitTime() {
    if (this.eventForm.valid) {
      const fromTime = this.eventForm.get('fromTime')?.value;
      const toTime = this.eventForm.get('toTime')?.value;
      const title = this.eventForm.get('title')?.value;
      const content = this.eventForm.get('content')?.value;

      const fromDate = new Date(this.selectedDate());
      const toDate = new Date(this.selectedDate());

      const [fromHours, fromMinutes] = fromTime.split(':').map(Number);
      const [toHours, toMinutes] = toTime.split(':').map(Number);

      fromDate.setHours(fromHours, fromMinutes, 0, 0);
      toDate.setHours(toHours, toMinutes, 0, 0);

      const timeblock: CreateTimeBlockDto = {
        from: fromDate.toISOString(),
        to: toDate.toISOString(),
        title,
        content,
        color: 'fuscia-300',
      };

      this.setTimeblock.emit({ ...this.timeblock(), ...timeblock });
    } else {
      Object.values(this.eventForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
    location.reload();
  }
}
