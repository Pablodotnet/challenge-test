import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardPage } from '../pages/DashboardPage';
import { DashboardLayout } from '../layout/DashboardLayout';
import { ClientsPage } from '../pages/ClientsPage';
import { ConversationsPage } from '../pages/ConversationsPage';
import { ConversationPage } from '../pages/ConversationPage';
import { ClientPage } from '../pages/ClientPage';

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="/clientes" element={<ClientsPage />} />
        <Route path="/clientes/:clientId" element={<ClientPage />} />
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
