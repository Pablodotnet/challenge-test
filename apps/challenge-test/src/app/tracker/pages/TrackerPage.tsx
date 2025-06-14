import { AddOutlined } from '@mui/icons-material';
import { TrackerLayout } from '../layout/TrackerLayout';
import { DetailsView, NothingSelectedView } from '../views';
import { IconButton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { startNewRoutine } from '../../store/routines/thunks';

export const TrackerPage = () => {
  const dispatch = useAppDispatch();
  const onClickNewRoutine = () => {
    dispatch(startNewRoutine());
  };
  const { isSaving, active } = useAppSelector((state) => state.routines);

  return (
    <TrackerLayout>
      {active ? <DetailsView /> : <NothingSelectedView />}
      <IconButton
        disabled={isSaving}
        onClick={onClickNewRoutine}
        size="large"
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </TrackerLayout>
  );
};
