export interface IDateProvider {
  convertToUTC(date: Date): string
  compareInHours(start_date: Date, end_date: Date): number
  dateNow(): Date
  compareInDays(start_date: Date, end_date: Date): number
  addDays(days: number):Date
}
