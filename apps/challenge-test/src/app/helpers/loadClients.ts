import { Client } from '../types';
import { mockClients } from './mocks/clients.mock';

export const loadClients = async (): Promise<Client[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockClients);
    }, 500); // Simulated 500ms delay
  });
};

export const getClientById = async (id: string): Promise<Client | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const client = mockClients.find((c) => c._id === id);
      resolve(client);
    }, 500); // Simulated 500ms delay
  });
};
