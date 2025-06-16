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
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Client } from '../../helpers';

export const ClientsPage = () => {
  const clients: Client[] = useSelector((state: RootState) => state.clients.clients);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <List sx={{ width: '100%' }}>
              {clients.map((client, index) => (
                <React.Fragment key={client._id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={client.name} />
                    </ListItemAvatar>
                    <ListItemText primary={client.name} />
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
              <Avatar sx={{ width: 80, height: 80 }}></Avatar>
              <Typography variant="h6">
                {clients.length} {clients.length === 1 ? 'cliente' : 'clientes'}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
