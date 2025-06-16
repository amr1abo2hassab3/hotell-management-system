export interface BookingResponse {
    data: Booking[]
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
  }
  
  export interface Booking {
    bookingNumber: number;
    customerName: string;
    roomType?: string;
    arrivalDate: string;
    departureDate: string;
    condition: string;
  }
  

export interface MyBooking {
  bookingId: number;
  arrivalDate: string | null;
  departureDate: string | null;
  totalPrice: number
  bookingCondition: string;
  roomId: number;
  roomPicture: string;
  roomDescription: string;
  roomPrice: number;
}