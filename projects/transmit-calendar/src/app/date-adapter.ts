const DAYS_PER_WEEK = 7;

export interface ITime {
  h: number;
  m: number;
}

export const WEEK_DAYS: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export class DateAdapter {
  public static generateWeeks(start: Date): Date[][] {
    if (!start) {
      return undefined;
    }
    const result: Date[][] = [];
    let current: Date = start;
    while (current.getMonth() === start.getMonth()) {
      let currentWeek: Date[] = [];
      for (let i = 0; i < DAYS_PER_WEEK; i++) {
        if (current.getDate() === 1 && current.getDay() > i) {
          currentWeek.push(this.addDays(current, (-1) * (current.getDay() - i)));
        } else {
          currentWeek.push(current);
          current = this.addDays(current, 1);
        }
      }
      result.push(currentWeek);
      currentWeek = [];
    }
    return result;
  }

  public static addDays(date: Date, qty: number): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + qty);
  }

  public static generateStingTimes(): string[] {
    const times: string[] = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 15) {
        times.push(`${this.addLeadingZero(i)}:${this.addLeadingZero(j)}`);
      }
    }
    return times;
  }

  private static addLeadingZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  public static parseStringTime(value: string): ITime {
    value = value.replace(/\s/g, '');
    const splittedValue = value.split(':');
    if (splittedValue.length !== 2) {
      return null;
    }
    const h = +splittedValue[0];
    const m = +splittedValue[1];
    if (isNaN(h) || isNaN(m)) {
      return null;
    }
    return { h, m };
  }

  public static timeToString(time: ITime): string {
    return `${this.addLeadingZero(time.h)}:${this.addLeadingZero(time.m)}`;
  }

  public static afterTimes(startPoint: ITime, times: string[]) {
    let result: string[] = times.slice(0);
    result = result.filter(t => {
      const parsedTime = this.parseStringTime(t);
      return parsedTime.h > startPoint.h || (parsedTime.h === startPoint.h && parsedTime.m > startPoint.m);
    });
    return result;
  }

  public static addHrsToStringTime(value: string, hrs: number = 1): string {
    const time = this.parseStringTime(value);
    if (!time) {
      return null;
    }
    return this.timeToString({h: time.h + hrs, m: time.m});
  }

  public static isEqualDay(date1: Date, date2: Date): boolean {
    if (!date1 || !date2) {
      return false;
    }
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }

  public static isLessDay(date1: Date, date2: Date): boolean {
    if (!date1 || !date2) {
      return false;
    }
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() < date2.getDate();
  }
}
