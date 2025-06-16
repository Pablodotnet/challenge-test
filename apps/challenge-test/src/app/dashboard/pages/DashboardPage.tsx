import { Box, Grid, Paper, Skeleton, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Client } from '../../types';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

export const DashboardPage = () => {
  const clients: Client[] = useSelector(
    (state: RootState) => state.clients.clients
  );
  const conversations: string[] = useSelector(
    (state: RootState) => state.conversations.index
  );

  const isClientsLoading = clients.length === 0;
  const isConversationsLoading = conversations.length === 0;

  const handleClickCard = (page: string) => {
    window.location.href = page;
  };

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
                <>
                  <Skeleton variant="circular" width={80} height={80} />
                  <Skeleton variant="text" width="60%" height={30} />
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={() => handleClickCard('/clientes')}
                    role="button"
                    className="cursor-pointer"
                  >
                    <AccountCircleIcon sx={{ fontSize: 90 }} />
                  </Box>
                  <Typography variant="h6">
                    {clients.length}{' '}
                    {clients.length === 1 ? 'cliente' : 'clientes'}
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
                <>
                  <Skeleton variant="circular" width={80} height={80} />
                  <Skeleton variant="text" width="60%" height={30} />
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={() => handleClickCard('/conversaciones')}
                    role="button"
                    className="cursor-pointer"
                  >
                    <QuestionAnswerIcon sx={{ fontSize: 80 }} />
                  </Box>
                  <Typography variant="h6">
                    {conversations.length}{' '}
                    {conversations.length === 1
                      ? 'conversación'
                      : 'conversaciones'}
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
