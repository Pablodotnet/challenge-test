import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import { Message } from '../../types';

interface ConversationDisplayProps {
  clientName: string;
  messages: Message[];
}

export const ConversationDisplay: React.FC<ConversationDisplayProps> = ({
  clientName,
  messages,
}) => {
  const theme = useTheme();

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {messages.map((msg: Message, idx) => {
        const isClient = msg.message.typeUser === 'Client';

        const clientBg =
          theme.palette.mode === 'dark'
            ? theme.palette.grey[800]
            : theme.palette.grey[200];
        const systemBg =
          theme.palette.mode === 'dark'
            ? theme.palette.primary.dark
            : theme.palette.primary.light;

        return (
          <Box
            key={idx}
            display="flex"
            justifyContent={isClient ? 'flex-start' : 'flex-end'}
          >
            <Paper
              elevation={1}
              sx={{
                p: 1.5,
                maxWidth: '75%',
                bgcolor: isClient ? clientBg : systemBg,
                borderRadius: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {isClient
                  ? `Cliente ${clientName}`
                  : `Sistema ${msg.message.user}`}
              </Typography>
              <Typography variant="body1" color="text.primary">
                {msg.message.text}
              </Typography>
            </Paper>
          </Box>
        );
      })}
    </Box>
  );
};
