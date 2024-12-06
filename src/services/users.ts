import { User, UsersResponse } from '../types/user';
import api from './api';

export const getUsers = async (page: number = 1): Promise<UsersResponse> => {
  const response = await api.get<UsersResponse>(`/users?page=${page}`);
  return response.data;
};

export const updateUser = async (id: number, userData: Partial<User>): Promise<User> => {
  const response = await api.put<User>(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};