import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ConversationIndexItem } from '../../types';
import { getConversationsWithMessageCount } from '../../helpers/mocks/conversations-index.mock';

type ConversationsTableRowData = {
  user: string;
  messages: number;
  createdAt: string;
};

function createData(user: string, messages: number, createdAt: string): ConversationsTableRowData {
  return { user, messages, createdAt };
}

export const ConversationsPage = () => {
  const [rows, setRows] = useState<ConversationsTableRowData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const conversationsIndex = await getConversationsWithMessageCount();

      const newRows =
        conversationsIndex?.map((conversation: ConversationIndexItem) =>
          createData(
            conversation.client_name,
            conversation.totalMessages,
            conversation.createdAt
          )
        ) ?? [];

      setRows(newRows);
    };

    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Client</TableCell>
            <TableCell>Messages</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.user}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.user}
              </TableCell>
              <TableCell>{row.messages}</TableCell>
              <TableCell>{row.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
