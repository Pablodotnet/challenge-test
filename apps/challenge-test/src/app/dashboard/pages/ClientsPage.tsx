import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Client } from '../../types';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getUsers } from '../../firebase/providers';

interface User {
  uid: string;
  email: string;
  displayName: string | null;
}

export const ClientsPage = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const clients: Client[] = useSelector(
    (state: RootState) => state.clients.clients
  );
  const isLoadingClients = clients.length === 0;

  const skeletonArray = Array.from({ length: 3 });

  const handleClientClick = (clientId: string) => {
    navigate(`/clientes/${clientId}`);
  };

  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();
      const filteredFetchedUsers = fetchedUsers.filter(
        (user) => user.uid !== currentUser?.uid
      );
      setUsers(filteredFetchedUsers);
      setIsLoadingUsers(false);
    };

    fetchUsers();
  }, [currentUser?.uid]);

  return (
    <Box sx={{ flexGrow: 1 }} data-testid="clients-page-container">
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h6" gutterBottom data-testid="clients-list">
              Lista de Clientes
            </Typography>
            <List sx={{ width: '100%' }}>
              {isLoadingClients
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
                      <ListItemButton
                        alignItems="flex-start"
                        onClick={() => handleClientClick(client._id)}
                      >
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
                      </ListItemButton>
                      {index < clients.length - 1 && (
                        <Divider variant="inset" component="li" />
                      )}
                    </React.Fragment>
                  ))}
            </List>
          </Paper>

          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Lista de Clientes Verificados
            </Typography>
            <List sx={{ width: '100%' }}>
              {isLoadingUsers
                ? skeletonArray.map((_, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
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
                : users.map((user, index) => (
                    <React.Fragment key={user.uid}>
                      <ListItemButton
                        onClick={() => handleClientClick(user.uid)}
                      >
                        <ListItemAvatar>
                          <Avatar>{user.displayName?.[0] || '?'}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={user.displayName || 'Sin nombre'}
                          secondary={user.email}
                        />
                      </ListItemButton>
                      {index < users.length - 1 && (
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
              {isLoadingClients ? (
                <>
                  <Skeleton variant="circular" width={80} height={80} />
                  <Skeleton width="40%" />
                </>
              ) : (
                <>
                  <Avatar sx={{ width: 80, height: 80 }}></Avatar>
                  <Typography variant="h6">
                    {clients.length + users.length}{' '}
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
