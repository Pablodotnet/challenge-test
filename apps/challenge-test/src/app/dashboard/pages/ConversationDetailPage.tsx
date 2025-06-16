import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store';
import { Conversation, ConversationIndexItem } from '../../types';
import { Box, Paper, Typography, Skeleton } from '@mui/material';
import { getConversationContentByFileName } from '../../helpers/mocks/conversations-index.mock';
import { formatDate } from '../../helpers';
import { ConversationDisplay } from '../components/ConversationDisplay';

export const ConversationDetailPage = () => {
  const { conversationId } = useParams<{ conversationId: string }>();

  const conversation: ConversationIndexItem | undefined = useSelector(
    (state: RootState) =>
      (state.conversations.index as ConversationIndexItem[]).find(
        (c: ConversationIndexItem) =>
          c.conversation_id.toString() === conversationId
      )
  );

  const [conversationContent, setConversationContent] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!conversation) {
      return;
    }

    const fetchContent = async () => {
      setLoading(true);
      setError(null);

      const data = await getConversationContentByFileName(
        conversation.fileName
      );

      if (data) {
        setConversationContent(data);
      } else {
        setError('Error al cargar el contenido de la conversación.');
      }
      setLoading(false);
    };

    fetchContent();
  }, [conversation]);

  if (!conversation || loading || error) {
    return (
      <Box>
        <Skeleton variant="rectangular" height={100} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={100} />
      </Box>
    );
  }

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Detalles de la Conversación</Typography>
        <Typography>Cliente: {conversation.client_name}</Typography>
        <Typography>
          Iniciada en: {formatDate(conversation.createdAt)}
        </Typography>
        <Typography>
          Mensajes totales:{' '}
          {conversationContent
            ? conversationContent.messages.length
            : conversation.totalMessages}
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Mensajes</Typography>
        {conversationContent && conversationContent?.messages?.length > 0 ? (
          <ConversationDisplay
            clientName={conversation.client_name}
            messages={conversationContent.messages}
          />
        ) : (
          <Typography>No se encontraron mensajes.</Typography>
        )}
      </Paper>
    </Box>
  );
};
