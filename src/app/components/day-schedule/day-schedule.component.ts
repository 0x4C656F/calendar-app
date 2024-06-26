import { daysOfTheWeek } from '../../services/date-service.service';
import { Component, effect, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeBlock, TimeblockService } from '../../services/timeblock.service';

@Component({
  selector: 'day-schedule',
  standalone: true,
  imports: [CommonModule],
  providers: [TimeblockService],
  templateUrl: './day-schedule.component.html',
  styleUrl: './day-schedule.component.css',
})
export class DayScheduleComponent {
  selectedDate = input.required<Date>();
  setSelectedTimeBlock = output<TimeBlock>();
  daysOfTheWeek;
  hoursOfTheDay = [
    '8 AM',
    '9 AM',
    '10 AM',
    '11 AM',
    '12 PM',
    '1 PM',
    '2 PM',
    '3 PM',
    '4 PM',
    '5 PM',
    '6 PM',
    '7 PM',
  ];

  constructor(public timeblockService: TimeblockService) {
    effect(() => {
      console.log(this.selectedDate().getDay());
    });
    this.daysOfTheWeek = daysOfTheWeek;
  }

  isInSameWeek(date1: string | Date, date2: string | Date): boolean {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    // Get the year and week number for both dates
    const getWeekNumber = (date: Date) => {
      const d = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );
      const dayNum = d.getUTCDay();
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      return Math.ceil(
        ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
      );
    };

    const week1 = getWeekNumber(d1);
    const week2 = getWeekNumber(d2);

    return d1.getFullYear() === d2.getFullYear() && week1 === week2;
  }

  isSelectedDay(day: string) {
    return this.selectedDate().getDay() === this.daysOfTheWeek.indexOf(day);
  }
}
