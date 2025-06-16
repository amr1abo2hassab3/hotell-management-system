// base url 
export const baseUrl: string = "https://hotellapp.runasp.net";
// auth
export const RegisterApi = "/api/Auth/register";
export const LoginApi: string = "/api/Auth/login";
export const forgotPassword: string = "/api/Auth/forgot-password"; 
export const verifyResetCode: string = "/api/Auth/verify-reset-code";
export const resetPassword: string = "/api/Auth/reset-password";
// featuerd 
export const featured: string = "/api/Rooms/featured";
// Rooms 
export const rooms: string = "/api/Rooms";
export const roomTypes: string = "/api/Rooms/roomtypes";
export const roomFilter:string = "/api/Rooms/rooms";
// Services
export const services: string = "/api/Service";
// favorite 
export const favorite: string = "/api/Favorite"
// Booking
export const booking: string = "/api/Booking/";
export const selectRoom: string = "/api/Booking/select-room"
export const selectService: string = "select-services"
export const payment: string = "payment"



// <<<<<< Dashboard >>>>>>>
// users management 
export const users: string = "/api/Users";
export const addUser: string = "/api/Users/add";
export const searchByEmail: string = "/api/Users/search-by-email";

// rooms management 
export const creatNewRoom: string = "/api/Rooms/create";

// Booking
export const AllCurrentBooking: string = "/api/Booking/current_Booking"
export const detailsBooking:string = "/detailsBooking"
export const cancelBooking: string = "/cancelBooking"
export const confirmBooking: string = "/confirmBooking"
export const addBooking: string = "add_Booking"
export const daily_stats_Booking: string = "/api/Booking/daily-stats_Booking"
export const activeBookings: string = "/api/Booking/active-bookings"
export const FutureBookings: string = "/api/Booking/future-bookings"
export const monthlyEarnings: string = "/api/Booking/monthly-earnings"
export const newMembers: string = "/api/Booking/new-members"
export const occupancyRate: string = "/api/Booking/room-occupancy-rate"


