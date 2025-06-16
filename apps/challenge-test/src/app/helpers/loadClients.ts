import { Client } from '../types';
import { mockClients } from './mocks/clients.mock';
import { sleep } from './utils';

export const loadClients = async (): Promise<Client[]> => {
  return new Promise((resolve) => {
    sleep(1000).then(() => {
      resolve(mockClients);
    })
  });
};

export const getClientById = async (id: string): Promise<Client | undefined> => {
  return new Promise((resolve) => {
    sleep(1000).then(() => {
      const client = mockClients.find((c) => c._id === id);
      resolve(client);
    });
  });
};
