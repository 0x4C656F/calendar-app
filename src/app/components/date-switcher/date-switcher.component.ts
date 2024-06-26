import { Component, input, output } from '@angular/core';
import { DateService } from '../../services/date-service.service';
import { DatePipe, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'date-switcher',
  standalone: true,
  imports: [DatePipe, CommonModule, MatButtonModule, MatIconModule],
  providers: [DateService],
  templateUrl: './date-switcher.component.html',
  styleUrl: './date-switcher.component.css',
})
export class DateSwitcherComponent {
  selectedDate = input.required<Date>();
  setSelectedDate = output<Date>();
  constructor(public dateService: DateService) {}

  getNextDate() {
    const date = new Date(this.selectedDate());
    date.setDate(date.getDate() + 1);
    return date;
  }

  getPrevDate() {
    const date = new Date(this.selectedDate());
    date.setDate(date.getDate() - 1);
    return date;
  }

  setNextDate() {
    this.setSelectedDate.emit(this.getNextDate());
  }

  setPrevDate() {
    this.setSelectedDate.emit(this.getPrevDate());
  }
}
