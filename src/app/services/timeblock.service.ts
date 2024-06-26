import { Injectable } from '@angular/core';
import { nanoid } from 'nanoid';
export type TimeBlock = {
  id: string;
  from: string;
  to: string;
  title: string;
  content: string;
  color: string;
  left: number;
  top: number;
  height: number;
  width: number;
};

export interface CreateTimeBlockDto {
  from: string;
  to: string;
  title: string;
  content: string;
  color: string;
}

@Injectable({
  providedIn: 'root',
})
export class TimeblockService {
  timeblocks: TimeBlock[] = [];
  readonly BLOCK_WIDTH = 120;
  readonly HOUR_HEIGHT = 60; // 60px per hour
  readonly START_HOUR = 8; // 8 AM
  readonly END_HOUR = 19; // 7 PM

  constructor() {
    const timeblocks = localStorage.getItem('timeblocks');
    if (timeblocks) {
      this.timeblocks = JSON.parse(timeblocks);
    }
  }

  create(dto: CreateTimeBlockDto) {
    const blockHeight = this.calculateBlockHeight(dto.from, dto.to);
    const blockTop = this.calculateBlockTop(dto.from);
    const blockLeft = this.calculateBlockLeft(new Date(dto.from));
    const block: TimeBlock = {
      ...dto,
      height: blockHeight,
      id: nanoid(),
      top: blockTop,
      left: blockLeft,
      width: this.BLOCK_WIDTH,
    };
    if (this.checkIfBlockIsOverlapping(block)) {
      throw new Error('Block is overlapping');
    }
    this.timeblocks.push(block);
    localStorage.setItem('timeblocks', JSON.stringify(this.timeblocks));
  }

  private parseTime(dateTimeString: string): number {
    const date = new Date(dateTimeString);
    return date.getHours() + date.getMinutes() / 60;
  }

  calculateBlockHeight(from: string, to: string): number {
    const fromHours = this.parseTime(from);
    const toHours = this.parseTime(to);
    return (toHours - fromHours) * this.HOUR_HEIGHT;
  }

  calculateBlockTop(from: string): number {
    const fromHours = this.parseTime(from);
    return (fromHours - this.START_HOUR) * this.HOUR_HEIGHT;
  }

  calculateBlockLeft(date: Date): number {
    return date.getDay() * this.BLOCK_WIDTH;
  }

  checkIfBlockIsOverlapping(block: TimeBlock): boolean {
    return this.timeblocks.some((b) => {
      const bFrom = new Date(b.from);
      const bTo = new Date(b.to);
      const blockFrom = new Date(block.from);
      const blockTo = new Date(block.to);
      return bFrom < blockTo && bTo > blockFrom;
    });
  }

  removeTimeBlockByFromTimestamp(timestamp: string) {
    this.timeblocks = this.timeblocks.filter(
      (block) => block.from !== timestamp
    );
    localStorage.setItem('timeblocks', JSON.stringify(this.timeblocks));
    location.reload();
  }

  editTimeBlockById(id: string, block: TimeBlock) {
    const index = this.timeblocks.findIndex((block) => block.id === id);
    this.timeblocks[index] = { ...this.timeblocks[index], ...block };
    const newHeight = this.calculateBlockHeight(block.from, block.to);
    const newTop = this.calculateBlockTop(block.from);
    this.timeblocks[index].height = newHeight;
    this.timeblocks[index].top = newTop;
    localStorage.setItem('timeblocks', JSON.stringify(this.timeblocks));
    location.reload();
  }
}
