import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Skeleton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConversationIndexItem } from '../../types';
import { getConversationsWithMessageCount } from '../../helpers/mocks/conversations-index.mock';
import { formatDate } from '../../helpers';

type ConversationsTableRowData = {
  id: string;
  user: string;
  messages: number;
  createdAt: string;
};

function createData(
  id: string,
  user: string,
  messages: number,
  createdAt: string
): ConversationsTableRowData {
  return { id, user, messages, createdAt };
}

export const ConversationsPage = () => {
  const [rows, setRows] = useState<ConversationsTableRowData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const conversationsIndex = await getConversationsWithMessageCount();

      const newRows =
        conversationsIndex?.map((conversation: ConversationIndexItem) =>
          createData(
            conversation.conversation_id,
            conversation.client_name,
            conversation.totalMessages,
            conversation.createdAt
          )
        ) ?? [];

      setRows(newRows);
      setLoading(false);
    };

    fetchData();
  }, []);

  const skeletonRows = Array.from({ length: 4 });

  return (
    <TableContainer
      component={Paper}
      data-testid="conversaciones-page-container"
    >
      <Table sx={{ minWidth: 650 }} aria-label="conversations table">
        <TableHead>
          <TableRow>
            {loading ? (
              <>
                <TableCell>
                  <Skeleton width="80px" />
                </TableCell>
                <TableCell>
                  <Skeleton width="60px" />
                </TableCell>
                <TableCell>
                  <Skeleton width="100px" />
                </TableCell>
              </>
            ) : (
              <>
                <TableCell>Cliente</TableCell>
                <TableCell>Mensajes</TableCell>
                <TableCell>Creado En</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading
            ? skeletonRows.map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                </TableRow>
              ))
            : rows.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{
                    cursor: 'pointer',
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                  onClick={() => navigate(`/conversaciones/${row.id}`)}
                >
                  <TableCell component="th" scope="row">
                    {row.user}
                  </TableCell>
                  <TableCell>{row.messages}</TableCell>
                  <TableCell>{formatDate(row.createdAt)}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
