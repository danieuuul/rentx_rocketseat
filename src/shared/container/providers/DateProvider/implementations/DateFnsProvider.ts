import {
  differenceInHours as differenceInHoursDateFns,
  differenceInCalendarDays,
  formatISO,
  parseISO,
  addDays,
  addHours,
  isBefore,
} from "date-fns";

import IDateProvider from "../IDateProvider";

class DateFnsProvider implements IDateProvider {
  differenceInHours(dateLeft: number | Date, dateRight: number | Date): number {
    return differenceInHoursDateFns(dateLeft, dateRight);
  }
  differenceInDays(dateLeft: number | Date, dateRight: number | Date): number {
    return differenceInCalendarDays(dateLeft, dateRight);
  }
  parse_ISO_to_Date(date: string): Date {
    return parseISO(date);
  }
  parse_Date_to_ISO(date: Date): string {
    return formatISO(date);
  }
  addDaysFromNow(days: number): Date {
    return addDays(Date.now(), days);
  }
  addHoursFromNow(hours: number): Date {
    return addHours(Date.now(), hours);
  }
  isBefore(leftDate: Date | number, rightDate: Date | number): boolean {
    return isBefore(leftDate, rightDate);
  }
}

export { DateFnsProvider };
