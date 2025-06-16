import React from 'react';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Client } from '../../types';

export const ClientsPage = () => {
  const clients: Client[] = useSelector(
    (state: RootState) => state.clients.clients
  );
  const isLoading = clients.length === 0;

  const skeletonArray = Array.from({ length: 3 });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <List sx={{ width: '100%' }}>
              {isLoading
                ? skeletonArray.map((_, index) => (
                    <React.Fragment key={index}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Skeleton variant="circular" width={40} height={40} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={<Skeleton width="60%" />}
                          secondary={<Skeleton width="40%" />}
                        />
                      </ListItem>
                      {index < skeletonArray.length - 1 && (
                        <Divider variant="inset" component="li" />
                      )}
                    </React.Fragment>
                  ))
                : clients.map((client, index) => (
                    <React.Fragment key={client._id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt={client.name} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={client.name}
                          secondary={
                            <Typography
                              component="span"
                              variant="body2"
                              sx={{ color: 'text.primary', display: 'inline' }}
                            >
                              Total de conversaciones:{' '}
                              {client.totalConversations}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < clients.length - 1 && (
                        <Divider variant="inset" component="li" />
                      )}
                    </React.Fragment>
                  ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              {isLoading ? (
                <>
                  <Skeleton variant="circular" width={80} height={80} />
                  <Skeleton width="40%" />
                </>
              ) : (
                <>
                  <Avatar sx={{ width: 80, height: 80 }}></Avatar>
                  <Typography variant="h6">
                    {clients.length}{' '}
                    {clients.length === 1 ? 'cliente' : 'clientes'}
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
