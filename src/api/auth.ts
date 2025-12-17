import { apiClient } from './apiClient';

export type LoginRequest = {
  login: string; // email veya telefon (0555...)
  password: string;
};

export type RegisterRequest = {
  name: string;
  email?: string;
  phone?: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user?: {
    id?: number | string;
    name?: string;
    email?: string;
    phone?: string;
  };
};

export const authApi = {
  async login(payload: LoginRequest): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', payload);
    return data;
  },

  async register(payload: RegisterRequest): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>(
      '/auth/register',
      payload
    );
    return data;
  },

  // Opsiyonel: token ile kullanıcı bilgisi çekmek için (backend yaparsa)
  async me(): Promise<{ user: AuthResponse['user'] }> {
    const { data } = await apiClient.get<{ user: AuthResponse['user'] }>(
      '/auth/me'
    );
    return data;
  },
};
