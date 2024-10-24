export interface Booking {
  id: number;
  facilityId: number;
  visitorId: number;
  bookingDate: string;
  startTime: string;
  endTime: string;
  status: string;
}