export type Client = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const mockClients: Client[] = [
  {
    _id: '629a8125b2d313190810212f',
    name: 'Pedro Naranjo',
    createdAt: '1654292773900',
    updatedAt: '1657150137370',
  },
  {
    _id: '629e39e8b2d31319081e0650',
    name: 'Diego O',
    createdAt: '1654617133986',
    updatedAt: '1659028266305',
  },
];

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
