export interface Service {
  serviceName: string;
  servicePrice: number;
  quantity: number;
  serviceId: number;
}

export interface Room {
  roomId: number;
  roomPictures:string[]
  roomPrice: number;
  roomDescription: string;
  roomStatus: string;
  roomType: string;
  roomTypeId?: number;
  classification: number;
  roomTypeName: string;
  isFeatured: boolean;
  isFavorite: boolean;
  services: Service[];
}

export interface RoomsResponse {
  data: Room[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface RoomType {
  roomTypeId: number;
  name: string;
  isFeatured: boolean | null;
  roomCount: number;
}
