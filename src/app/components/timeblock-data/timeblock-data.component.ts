import { Component, input } from '@angular/core';
import {
  CreateTimeBlockDto,
  TimeBlock,
  TimeblockService,
} from '../../services/timeblock.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TimeblockEditFormComponent } from '../timeblock-edit-form/timeblock-edit-form.component';

@Component({
  selector: 'timeblock-data',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    TimeblockEditFormComponent,
  ],
  providers: [TimeblockService],
  templateUrl: './timeblock-data.component.html',
  styleUrl: './timeblock-data.component.css',
})
export class TimeblockDataComponent {
  timeblock = input.required<TimeBlock>();
  selectedDate = input.required<Date>();

  constructor(public timeblockService: TimeblockService) {}

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }

  calculateDuration(): string {
    if (!this.timeblock) {
      return '';
    }
    const start = new Date(this.timeblock().from);
    const end = new Date(this.timeblock().to);
    const durationMs = end.getTime() - start.getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.round((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  }

  editTimeblock(block: CreateTimeBlockDto) {
    const timeblock = { ...this.timeblock(), ...block };
    this.timeblockService.editTimeBlockById(this.timeblock().id, timeblock);
  }
}
