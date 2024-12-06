import { LoginCredentials, LoginResponse } from '../types/user';
import api from './api';

export const login = async (credentials: LoginCredentials): Promise<string> => {
  const response = await api.post<LoginResponse>('/login', credentials);
  return response.data.token;
};