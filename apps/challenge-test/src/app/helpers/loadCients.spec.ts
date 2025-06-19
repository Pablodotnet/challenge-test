import * as utils from './'; // <-- import the module you're spying on
import { loadClients, getClientById } from './';
import { mockClients } from './mocks/clients.mock';

jest.spyOn(utils, 'sleep').mockImplementation(() => Promise.resolve());

describe('Client functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loadClients', () => {
    it('should return all mock clients', async () => {
      const clients = await loadClients();
      expect(clients).toEqual(mockClients);
    });
  });

  describe('getClientById', () => {
    it('should return the correct client when ID exists', async () => {
      const targetClient = mockClients[0];
      const client = await getClientById(targetClient._id);
      expect(client).toEqual(targetClient);
    });

    it('should return undefined when client ID does not exist', async () => {
      const client = await getClientById('non-existent-id');
      expect(client).toBeUndefined();
    });
  });
});
