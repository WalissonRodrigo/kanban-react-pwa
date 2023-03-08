/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Grid, Typography } from '@mui/material';

import CardKanban from '@/components/CardKanban/CardKanban';
import Dialog from '@/components/Dialog';
import FabButton from '@/components/FabButton';
import FormKanban from '@/components/FormKanban';
import Meta from '@/components/Meta';
import { FullSizeFlexBoxStart } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';
import { useCardActions } from '@/store/_actions';

let pulling: number | undefined;

function Kanban() {
  const isPortrait = useOrientation();
  const [cards, actions] = useCardActions();
  const children: unknown = null;
  const [dialog, setDialog] = useState({
    open: false,
    children: children,
    title: 'Create New Card Kanban',
    textButtonSubmit: 'Save',
    onClose: () =>
      setDialog({
        ...dialog,
        open: false,
        children: children,
      }),
  });
  const cardsToDoFilter = () => cards.filter((card) => card.status === 'ToDo');
  const cardsGoingFilter = () => cards.filter((card) => card.status === 'Doing');
  const cardsDoneFilter = () => cards.filter((card) => card.status === 'Done');
  const [toDoList, setToDoList] = useState(cardsToDoFilter());
  const ToDoListMemo = useMemo(
    () => (
      <Grid item xs={12} md={4} style={{ height: '100%' }}>
        <Grid item xs={12}>
          <Typography component="p" variant="h5" style={{ color: '#2e7d32', fontWeight: 'bold' }}>
            To Do
          </Typography>
        </Grid>
        <Grid
          container
          direction={'column'}
          flexWrap={'nowrap'}
          alignItems={'flex-start'}
          justifyContent={'flex-start'}
          spacing={2}
          style={{ height: '100%' }}
        >
          {toDoList.map((card) => (
            <Grid
              item
              xs={12}
              key={card.id}
              style={{ marginTop: 8, marginBottom: 8, width: '100%' }}
            >
              <CardKanban {...{ card, dialog, setDialog }} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    ),
    [toDoList],
  );
  const [goingList, setGoingList] = useState(cardsGoingFilter());
  const GoingListMemo = useMemo(
    () => (
      <Grid item xs={12} md={4} style={{ height: '100%' }}>
        <Grid item xs={12}>
          <Typography component="p" variant="h5" style={{ color: '#0288d1', fontWeight: 'bold' }}>
            Doing
          </Typography>
        </Grid>
        <Grid
          container
          direction={'column'}
          flexWrap={'nowrap'}
          alignItems={'flex-start'}
          justifyContent={'flex-start'}
          spacing={2}
          style={{ height: '100%' }}
        >
          {goingList.map((card) => (
            <Grid
              item
              xs={12}
              key={card.id}
              style={{ marginTop: 8, marginBottom: 8, width: '100%' }}
            >
              <CardKanban {...{ card, dialog, setDialog }} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    ),
    [goingList],
  );
  const [doneList, setDoneList] = useState(cardsDoneFilter());
  const DoneListMemo = useMemo(
    () => (
      <Grid item xs={12} md={4} style={{ height: '100%' }}>
        <Grid item xs={12}>
          <Typography component="p" variant="h5" style={{ color: '#ed6c02', fontWeight: 'bold' }}>
            Done
          </Typography>
        </Grid>
        <Grid
          container
          direction={'column'}
          flexWrap={'nowrap'}
          alignItems={'flex-start'}
          justifyContent={'flex-start'}
          spacing={2}
          style={{ height: '100%' }}
        >
          {doneList.map((card) => (
            <Grid item key={card.id} style={{ marginTop: 8, marginBottom: 8, width: '100%' }}>
              <CardKanban {...{ card, dialog, setDialog }} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    ),
    [doneList],
  );
  const startPulling = () => {
    clearInterval(pulling);
    const minute = 1000 * 60;
    pulling = setInterval(actions.getAll, minute / 32);
  };

  const stopPulling = () => {
    clearInterval(pulling);
    pulling = undefined;
  };

  useEffect(() => {
    actions.getAll();
    startPulling();
    return () => stopPulling();
  }, []);

  useEffect(() => {
    setToDoList(cardsToDoFilter());
    setGoingList(cardsGoingFilter());
    setDoneList(cardsDoneFilter());
  }, [cards]);

  return (
    <>
      <Meta title="Manager" />
      <Dialog
        {...dialog}
        open={dialog.open}
        textButtonSubmit={dialog.textButtonSubmit || ''}
        title={dialog.title}
        dialog={{
          maxWidth: 'lg',
          keepMounted: true,
        }}
      >
        {dialog.children}
      </Dialog>
      <FullSizeFlexBoxStart flexDirection={isPortrait ? 'column' : 'row'}>
        <Grid container spacing={2} style={{ padding: 16 }}>
          {ToDoListMemo}
          {GoingListMemo}
          {DoneListMemo}
        </Grid>
        <FabButton
          icon={<AddIcon />}
          onClick={() => {
            setDialog({
              ...dialog,
              open: true,
              children: <FormKanban {...dialog} />,
            });
          }}
        />
      </FullSizeFlexBoxStart>
    </>
  );
}

export default Kanban;
