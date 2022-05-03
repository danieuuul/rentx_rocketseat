export default interface IDateProvider {
  differenceInHours(dateLeft: Date | number, dateRight: Date | number): number;
  differenceInDays(dateLeft: Date | number, dateRight: Date | number): number;
  parse_ISO_to_Date(date: string): Date;
  parse_Date_to_ISO(date: Date): string;
  addDaysFromNow(days: number): Date;
  addHoursFromNow(hours: number): Date;
  isBefore(leftDate: Date | number, rightDate: Date | number): boolean;
}
