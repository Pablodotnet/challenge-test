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
  Button,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { formatDate } from '../../helpers';
import { getConversationsWithMessageCount } from '../../helpers/mocks/conversations-index.mock';
import {
  getCurrentUser,
  getUserById,
  isClientFirestoreUser,
} from '../../firebase/providers';
import {
  query,
  collection,
  where,
  getDocs,
  addDoc,
} from 'firebase/firestore';
import { FirebaseDB } from '../../firebase/config';

export const ClientPage = () => {
  const navigate = useNavigate();
  const { clientId } = useParams<{ clientId: string }>();
  const currentUser = getCurrentUser();

  const [isClientDBRegistered, setIsClientDBRegistered] = useState<
    boolean | null
  >(null);
  const [fallbackClient, setFallbackClient] = useState<Client | null>(null);


  const client: Client | undefined = useSelector((state: RootState) =>
    (state.clients.clients as Client[]).find((c: Client) => c._id === clientId)
  );

  useEffect(() => {
    const checkUser = async () => {
      if (!clientId) return;
      const exists = await isClientFirestoreUser(clientId);
      setIsClientDBRegistered(exists);
    };

    checkUser();
  }, [clientId]);

  useEffect(() => {
    const fetchClientIfMissing = async () => {
      if (!client && clientId) {
        const user = await getUserById(clientId);
        if (user) {
          setFallbackClient({
            _id: user.uid,
            name: user.displayName || user.email || 'Cliente sin nombre',
            email: user.email || '',
            photoURL: user.photoURL || '',
            createdAt: user.createdAt || new Date(),
            updatedAt: new Date().toDateString(),
            totalConversations: 0,
          });
        }
      }
    };

    fetchClientIfMissing();
  }, [client, clientId]);

  const [loadedConversations, setLoadedConversations] = useState<
    ConversationIndexItem[] | null
  >(null);
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);

  const effectiveClient = client || fallbackClient;
  const isLoading = !effectiveClient || isLoadingConversations;

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

  const handleStartChat = async () => {
    const clientId = effectiveClient?._id;
    const currentUserId = currentUser?.uid;
    const chatsRef = collection(FirebaseDB, 'chats');
    const q = query(
      chatsRef,
      where('participants', 'array-contains', currentUserId)
    );

    const querySnapshot = await getDocs(q);

    let existingChat = null;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.participants.includes(clientId)) {
        existingChat = doc;
      }
    });

    let chatId;

    if (existingChat) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      chatId = (existingChat as any).id;
    } else {
      const newChat = await addDoc(chatsRef, {
        clientId,
        participants: [currentUserId, clientId],
        createdAt: Date.now(),
        messages: [],
      });
      chatId = newChat.id;
    }

    openChat(`${chatId}`);
  };


  const openChat = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  }

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
                  <Typography>{effectiveClient._id}</Typography>
                  <Typography>{effectiveClient.name}</Typography>
                  <Typography>
                    Creado en {formatDate(effectiveClient.createdAt)}
                  </Typography>
                  <Typography>
                    Última actualización en{' '}
                    {formatDate(effectiveClient.updatedAt)}
                  </Typography>
                  <Typography>
                    Conversaciones totales {effectiveClient.totalConversations}
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
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Typography variant="h6">Conversaciones del Cliente</Typography>
                {isClientDBRegistered && (
                  <Button
                    onClick={handleStartChat}
                    style={{
                      padding: '8px 16px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Iniciar Chat
                  </Button>
                )}
              </Box>
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
                        onClick={() => {
                          if (isClientDBRegistered) {
                            openChat(conv.conversation_id);
                          } else {
                            navigate(`/conversaciones/${conv.conversation_id}`);
                          }
                        }}
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
