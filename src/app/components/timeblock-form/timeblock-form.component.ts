import { Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  CreateTimeBlockDto,
  TimeblockService,
} from '../../services/timeblock.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'timeblock-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [TimeblockService],
  templateUrl: './timeblock-form.component.html',
  styleUrl: './timeblock-form.component.css',
})
export class TimeblockFormComponent {
  selectedDate = input.required<Date>();
  submitTime = output<void>();
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
}
