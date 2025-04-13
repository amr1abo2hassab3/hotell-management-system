
export interface UserType {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  role: "User" | "Admin";
}

export interface UsersResponse {
  data: UserType[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface UserTypeAdd {
     fullName: string,
      phoneNumber: string,
      email: string,
      password: string,
      role: string,
}