export interface JwtPayload {
  id: string;
  role: 'USER' | 'PROVIDER' | 'ORGANIZATION' | 'ADMIN';
  mode: 'RURAL' | 'URBAN';
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface LocationQuery {
  latitude: number;
  longitude: number;
  radiusKm?: number;
}
