import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Client } from '../../types';

export const DashboardPage = () => {
  const clients: Client[] = useSelector(
    (state: RootState) => state.clients.clients
  );
  const conversations: string[] = useSelector(
    (state: RootState) => state.conversations.index
  );

  const isClientsLoading = clients.length === 0;
  const isConversationsLoading = conversations.length === 0;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                minHeight: 150,
                justifyContent: 'center',
              }}
            >
              {isClientsLoading ? (
                <CircularProgress />
              ) : (
                <>
                  <Avatar sx={{ width: 80, height: 80 }} />
                  <Typography variant="h6">
                    {clients.length} {clients.length === 1 ? 'cliente' : 'clientes'}
                  </Typography>
                </>
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                minHeight: 150,
                justifyContent: 'center',
              }}
            >
              {isConversationsLoading ? (
                <CircularProgress />
              ) : (
                <>
                  <Avatar sx={{ width: 80, height: 80 }} />
                  <Typography variant="h6">
                    {conversations.length} {conversations.length === 1 ? 'conversación' : 'conversaciones'}
                  </Typography>
                </>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
