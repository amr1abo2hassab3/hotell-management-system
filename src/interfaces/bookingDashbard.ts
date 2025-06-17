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
    roomType?: RoomType;
    arrivalDate: string;
    departureDate: string;
    condition: string;
  }
  

export interface RoomType {
  roomTypeId: number;
  name: string;
  isFeatured: boolean;
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