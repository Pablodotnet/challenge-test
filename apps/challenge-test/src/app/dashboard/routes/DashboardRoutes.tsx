import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardPage } from '../pages/DashboardPage';
import { DashboardLayout } from '../layout/DashboardLayout';
import { ClientsPage } from '../pages/ClientsPage';
import { ConversationsPage } from '../pages/ConversatiosPage';
import { ConversationDetailPage } from '../pages/ConversationDetailPage';

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="/clientes" element={<ClientsPage />} />
        <Route path="/conversaciones" element={<ConversationsPage />} />
        <Route path="/conversaciones/:conversationId" element={<ConversationDetailPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};
