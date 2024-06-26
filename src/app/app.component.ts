import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DateService } from './services/date-service.service';
import { DatePipe } from '@angular/common';
import { DateSwitcherComponent } from './components/date-switcher/date-switcher.component';
import { DayScheduleComponent } from './components/day-schedule/day-schedule.component';
import { TimeblockFormComponent } from './components/timeblock-form/timeblock-form.component';
import { TimeBlock } from './services/timeblock.service';
import { TimeblockDataComponent } from './components/timeblock-data/timeblock-data.component';
import { TimeblockCreationFormComponent } from './components/timeblock-creation-form/timeblock-creation-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CalendarComponent,
    DateSwitcherComponent,
    DayScheduleComponent,
    TimeblockFormComponent,
    TimeblockDataComponent,
    TimeblockCreationFormComponent,
  ],
  providers: [DateService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'calendar-app';
  // I really wanted it to do using rxjs Subjects but I couldn't get it to work(for reason unknown), so used the simpler version :/.
  viewedDate: Date = new Date();
  selectedDate: Date = new Date();
  selectedTimeblock: TimeBlock | null = null;

  setSelectedTimeBlock(timeblock: TimeBlock) {
    this.selectedTimeblock = timeblock;
  }

  getTimeBlock() {
    return this.selectedTimeblock as TimeBlock;
  }

  setSelectedDate(date: Date) {
    if (this.compareMonthAndYear(date)) {
      this.setViewedDate(date);
    }
    this.selectedDate = date;
  }

  compareMonthAndYear(date: Date) {
    return (
      date.getMonth() !== this.selectedDate.getMonth() ||
      date.getFullYear() !== this.selectedDate.getFullYear()
    );
  }

  setViewedDate(date: Date) {
    this.viewedDate = date;
  }
}
