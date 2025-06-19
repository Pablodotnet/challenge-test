import { renderHook } from '@testing-library/react';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppSelector, useAppDispatch } from '../hooks';
import {
  login,
  logout,
  startLoadingClients,
  startLoadingConversations,
} from '../store';
import { registerUserInFirestore } from '../firebase/providers';

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
  getAuth: jest.fn(),
}));

jest.mock('../hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

jest.mock('../store', () => ({
  login: jest.fn(),
  logout: jest.fn(),
  startLoadingClients: jest.fn(),
  startLoadingConversations: jest.fn(),
}));

jest.mock('../firebase/providers', () => ({
  registerUserInFirestore: jest.fn(),
}));

describe('useCheckAuth hook', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      status: 'checking',
    });
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('should dispatch logout if no user is authenticated', async () => {
    const mockListener = jest.fn((_, cb) => {
      cb(null); // Simulate unauthenticated user
    });
    (onAuthStateChanged as jest.Mock).mockImplementation(mockListener);

    renderHook(() => useCheckAuth());

    expect(onAuthStateChanged).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(logout({}));
  });

  it('should dispatch login and other actions if user is authenticated', async () => {
    const mockUser = {
      uid: '123',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: 'http://photo.url',
    };

    const mockListener = jest.fn((_, cb) => {
      cb(mockUser); // Simulate logged-in user
    });

    (onAuthStateChanged as jest.Mock).mockImplementation(mockListener);

    renderHook(() => useCheckAuth());

    expect(mockDispatch).toHaveBeenCalledWith(login(mockUser));
    expect(registerUserInFirestore).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(startLoadingClients());
    expect(mockDispatch).toHaveBeenCalledWith(startLoadingConversations());
  });

  it('should return the correct auth status', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      status: 'authenticated',
    });

    const { result } = renderHook(() => useCheckAuth());
    expect(result.current.status).toBe('authenticated');
  });
});
