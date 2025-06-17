import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import MessageIcon from '@mui/icons-material/Message';
import { RootState } from '../../store';
import { Client, ConversationIndexItem } from '../../types';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Skeleton,
  Avatar,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { formatDate } from '../../helpers';
import { getConversationsWithMessageCount } from '../../helpers/mocks/conversations-index.mock';

export const ClientPage = () => {
  const navigate = useNavigate();
  const { clientId } = useParams<{ clientId: string }>();

  const client: Client | undefined = useSelector((state: RootState) =>
    (state.clients.clients as Client[]).find((c: Client) => c._id === clientId)
  );

  const [loadedConversations, setLoadedConversations] = useState<
    ConversationIndexItem[] | null
  >(null);
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);

  useEffect(() => {
    const loadConversations = async () => {
      setIsLoadingConversations(true);
      const result = await getConversationsWithMessageCount();
      setLoadedConversations(result);
      setIsLoadingConversations(false);
    };
    loadConversations();
  }, []);

  const clientConversations: ConversationIndexItem[] =
    client && loadedConversations
      ? loadedConversations.filter(
          (conversation: ConversationIndexItem) =>
            conversation.client_id === client._id
        )
      : [];

  const isLoading = !client || isLoadingConversations;

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
            {isLoading ? (
              <Skeleton
                variant="circular"
                width={80}
                height={80}
                sx={{ margin: '0 auto' }}
              />
            ) : (
              <Avatar sx={{ width: 80, height: 80, margin: '0 auto' }}>
                <PersonIcon fontSize="large" />
              </Avatar>
            )}
            <Box mt={2}>
              {isLoading ? (
                <>
                  <Skeleton width="60%" sx={{ margin: '0 auto', mb: 1 }} />
                  <Skeleton width="80%" sx={{ margin: '0 auto', mb: 1 }} />
                </>
              ) : (
                <Stack spacing={1}>
                  <Typography>{client._id}</Typography>
                  <Typography>{client.name}</Typography>
                  <Typography>
                    Creado en {formatDate(client.createdAt)}
                  </Typography>
                  <Typography>
                    Última actualización en {formatDate(client.updatedAt)}
                  </Typography>
                  <Typography>
                    Conversaciones totales {client.totalConversations}
                  </Typography>
                </Stack>
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            {isLoading ? (
              <Skeleton variant="text" width="50%" height={32} sx={{ mb: 2 }} />
            ) : (
              <Typography variant="h6" sx={{ mb: 2 }}>
                Conversaciones del Cliente
              </Typography>
            )}
            <List sx={{ width: '100%' }}>
              {isLoading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <React.Fragment key={index}>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={<Skeleton width="60%" />}
                          secondary={<Skeleton width="40%" />}
                        />
                      </ListItem>
                      {index < 2 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))
                : clientConversations.map((conv, index) => (
                    <React.Fragment key={conv.conversation_id}>
                      <ListItemButton
                        onClick={() =>
                          navigate(`/conversaciones/${conv.conversation_id}`)
                        }
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <MessageIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${formatDate(conv.createdAt)}`}
                          secondary={`Mensajes totales: ${conv.totalMessages.toString()}`}
                        />
                      </ListItemButton>
                      {index < clientConversations.length - 1 && (
                        <Divider variant="inset" component="li" />
                      )}
                    </React.Fragment>
                  ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
