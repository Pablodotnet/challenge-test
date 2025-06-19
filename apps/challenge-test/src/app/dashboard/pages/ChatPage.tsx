import {
  query,
  collection,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Skeleton,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FirebaseDB } from '../../firebase/config';
import { getCurrentUser } from '../../firebase/providers';

export const ChatPage = () => {
  const { chatId } = useParams<{ chatId: string }>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chatId) {
      console.error('El chatId no está definido.');
      return;
    }

    const q = query(
      collection(FirebaseDB, 'chats', chatId, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fetchedMessages: any[] = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });

      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt?.seconds - b.createdAt?.seconds
      );

      setMessages(sortedMessages);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [chatId]);

  const handleSendMessage = async () => {
    if (!chatId || !newMessage.trim()) return;

    await addDoc(collection(FirebaseDB, 'chats', chatId, 'messages'), {
      text: newMessage.trim(),
      createdAt: serverTimestamp(),
      sender: getCurrentUser()?.uid,
      receiver: '',
    });

    setNewMessage('');
  };

  const isCurrentUserMessage = (sender: string) => {
    const currentUser = getCurrentUser();
    return currentUser ? sender === currentUser.uid : false;
  };

  const theme = useTheme();
  const clientBg =
    theme.palette.mode === 'dark'
      ? theme.palette.grey[800]
      : theme.palette.grey[200];
  const systemBg =
    theme.palette.mode === 'dark'
      ? theme.palette.primary.dark
      : theme.palette.primary.light;

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Detalles del Chat</Typography>
        <Typography>ID del chat: {chatId}</Typography>
        <Typography>Total de mensajes: {messages.length}</Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 2, mb: 2, minHeight: '300px' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Mensajes
        </Typography>

        {loading ? (
          <>
            <Skeleton variant="rectangular" height={40} sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" height={40} sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" height={40} />
          </>
        ) : messages.length > 0 ? (
          <Box display="flex" flexDirection="column" gap={1}>
            {messages.map((msg, index) => {
              const isCurrentUserMsg = isCurrentUserMessage(msg.sender);
              return (
                <Box
                  key={index}
                  display="flex"
                  justifyContent={isCurrentUserMsg ? 'flex-end' : 'flex-start'}
                >
                  <Paper
                    elevation={1}
                    sx={{
                      p: 1.5,
                      maxWidth: '75%',
                      bgcolor: isCurrentUserMsg ? clientBg : systemBg,
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {isCurrentUserMsg ? `Yo` : `Usuario`}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      {msg.text}
                    </Typography>
                  </Paper>
                </Box>
              );
            })}
          </Box>
        ) : (
          <Typography>No hay mensajes en este chat.</Typography>
        )}
      </Paper>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Enviar Mensaje
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Escribe tu mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            Enviar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
