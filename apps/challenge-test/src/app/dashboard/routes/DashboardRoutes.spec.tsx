import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DashboardRoutes } from './DashboardRoutes'; // Assuming the component is in the same directory
import { Provider } from 'react-redux';
import { store } from '../../store';

jest.mock('../pages', () => ({
  ...jest.requireActual('../pages'),
  DashboardPage: () => <div>Dashboard Page</div>,
  ClientsPage: () => <div>Clients Page</div>,
  ClientPage: () => <div>Client Page</div>,
  ChatPage: () => <div>Chat Page</div>,
  ConversationsPage: () => <div>Conversations Page</div>,
  ConversationPage: () => <div>Conversation Page</div>,
}));

describe('DashboardRoutes', () => {
  it('should render DashboardPage when navigating to /', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <DashboardRoutes />
        </MemoryRouter>
      </Provider>
    );

    // Simulate navigating to the dashboard route
    window.history.pushState({}, 'Dashboard', '/');

    // Check if the DashboardPage is rendered
    expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
  });

  it('should render ClientsPage when navigating to /clientes', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/clientes']}>
          <DashboardRoutes />
        </MemoryRouter>
      </Provider>
    );

    // Simulate navigating to the clientes route
    window.history.pushState({}, 'ClientsPage', '/clientes');

    // Check if the ClientsPage is rendered
    expect(screen.getByText('Clients Page')).toBeInTheDocument();
  });

  it('should render ClientPage when navigating to /clientes/:clientId', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/clientes/:clientId']}>
          <DashboardRoutes />
        </MemoryRouter>
      </Provider>
    );

    // Simulate navigating to the /clientes/:clientId route
    window.history.pushState({}, 'ClientPage', '/clientes/mfs9ns47g4');

    // Check if the ClientPage is rendered
    expect(screen.getByText('Client Page')).toBeInTheDocument();
  });

  it('should render ChatPage when navigating to /chat/:chatId', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/chat/:chatId']}>
          <DashboardRoutes />
        </MemoryRouter>
      </Provider>
    );

    // Simulate navigating to the /chat/:chatId route
    window.history.pushState({}, 'ChatPage', '/chat/mfs9ns47g4');

    // Check if the ChatPage is rendered
    expect(screen.getByText('Chat Page')).toBeInTheDocument();
  });

  it('should render ConversationsPage when navigating to /conversaciones', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/conversaciones']}>
          <DashboardRoutes />
        </MemoryRouter>
      </Provider>
    );

    // Simulate navigating to the /conversaciones route
    window.history.pushState({}, 'ConversationsPage', '/conversaciones');

    // Check if the ConversationsPage is rendered
    expect(screen.getByText('Conversations Page')).toBeInTheDocument();
  });

  it('should render ConversationPage when navigating to /conversaciones/:conversationId', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/conversaciones/:conversationId']}>
          <DashboardRoutes />
        </MemoryRouter>
      </Provider>
    );

    // Simulate navigating to the /conversaciones/:conversationId route
    window.history.pushState(
      {},
      'ConversationPage',
      '/conversaciones/mfs9ns47g4'
    );

    // Check if the ConversationPage is rendered
    expect(screen.getByText('Conversation Page')).toBeInTheDocument();
  });
});
