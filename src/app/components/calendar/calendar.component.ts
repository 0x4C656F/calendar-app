import { Component, input, output, effect } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  DateService,
  monthNames,
  daysOfTheWeek,
} from '../../services/date-service.service';

@Component({
  selector: 'calendar',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  selectedDate = input.required<Date>();
  setSelectedDate = output<Date>();

  viewedDate = input.required<Date>();
  setViewedDate = output<Date>();

  readonly DAYS_PER_WEEK = 7;
  readonly WEEKS_TO_DISPLAY = 5;
  readonly TOTAL_DAYS = this.DAYS_PER_WEEK * this.WEEKS_TO_DISPLAY;
  readonly daysOfTheWeek = daysOfTheWeek;

  calendarDates: Date[] = [];
  currentMonth: string = '';
  currentYear: number = 0;

  constructor(public dateService: DateService) {
    effect(() => {
      this.updateCalendar();
    });
  }

  prevMonth(): void {
    const newDate = new Date(this.viewedDate());
    newDate.setMonth(newDate.getMonth() - 1);
    this.setViewedDate.emit(newDate);
  }

  nextMonth(): void {
    const newDate = new Date(this.viewedDate());
    newDate.setMonth(newDate.getMonth() + 1);
    this.setViewedDate.emit(newDate);
  }

  isDateFromCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.viewedDate().getMonth();
  }

  private updateCalendar(): void {
    this.generateCalendar();
    this.updateCurrentMonthAndYear();
  }

  private generateCalendar(): void {
    const firstDayOfMonth = new Date(
      this.viewedDate().getFullYear(),
      this.viewedDate().getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      this.viewedDate().getFullYear(),
      this.viewedDate().getMonth() + 1,
      0
    );

    this.calendarDates = [
      ...this.getPreviousMonthDates(firstDayOfMonth),
      ...this.getCurrentMonthDates(lastDayOfMonth),
      ...this.getNextMonthDates(lastDayOfMonth),
    ];
  }

  private getPreviousMonthDates(firstDayOfMonth: Date): Date[] {
    const startOffset = firstDayOfMonth.getDay();
    return Array.from({ length: startOffset }, (_, i) => {
      const date = new Date(firstDayOfMonth);
      date.setDate(date.getDate() - (startOffset - i));
      return date;
    });
  }

  private getCurrentMonthDates(lastDayOfMonth: Date): Date[] {
    return Array.from(
      { length: lastDayOfMonth.getDate() },
      (_, i) =>
        new Date(
          this.viewedDate().getFullYear(),
          this.viewedDate().getMonth(),
          i + 1
        )
    );
  }

  private getNextMonthDates(lastDayOfMonth: Date): Date[] {
    const remainingDays =
      this.TOTAL_DAYS -
      (lastDayOfMonth.getDate() + lastDayOfMonth.getDay() + 1);
    return Array.from({ length: remainingDays }, (_, i) => {
      const date = new Date(lastDayOfMonth);
      date.setDate(date.getDate() + i + 1);
      return date;
    });
  }

  private updateCurrentMonthAndYear(): void {
    this.currentMonth = monthNames[this.viewedDate().getMonth()];
    this.currentYear = this.viewedDate().getFullYear();
  }

  private checkAndUpdateViewedDate(): void {
    const selectedDate = this.selectedDate();
    const viewedDate = this.viewedDate();

    if (
      selectedDate.getMonth() !== viewedDate.getMonth() ||
      selectedDate.getFullYear() !== viewedDate.getFullYear()
    ) {
      this.setViewedDate.emit(new Date(selectedDate));
    }
  }
}
