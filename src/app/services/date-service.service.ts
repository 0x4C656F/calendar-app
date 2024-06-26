import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

@Injectable({
  providedIn: 'root',
})
export class DateService {
  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return this.isSameDate(today, date);
  }
}
