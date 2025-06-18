import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardLayout } from '../layout';
import {
  ChatPage,
  ClientPage,
  ClientsPage,
  ConversationPage,
  ConversationsPage,
  DashboardPage
} from '../pages';

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="/clientes" element={<ClientsPage />} />
        <Route path="/clientes/:clientId" element={<ClientPage />} />
        <Route path="/chat/:chatId" element={<ChatPage />} />
        <Route path="/conversaciones" element={<ConversationsPage />} />
        <Route
          path="/conversaciones/:conversationId"
          element={<ConversationPage />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};
