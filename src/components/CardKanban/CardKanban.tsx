/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material';

import ActionButton from '@/components/ActionButton';
import FormKanban from '@/components/FormKanban';
import { useCardActions } from '@/store/_actions';
import { Card as CardType, StatusKanban } from '@/store/_state';

type CardKanbanProps = {
  card: CardType;
  dialog: any;
  setDialog: any;
};

function CardKanban(props: CardKanbanProps) {
  const { card, dialog, setDialog } = props;
  const [, actions] = useCardActions();
  return (
    <Paper elevation={3}>
      <Card>
        <CardContent>
          <Typography component="h5" variant="h5">
            {card.title}
          </Typography>
          <Divider />
          <Typography component="h6" variant="h6">
            {card.content}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            size="small"
            color="success"
            variant="outlined"
            onClick={() => {
              const payload = { ...card, status: StatusKanban.ToDo };
              actions.updateCard(card.id, payload);
              actions.getAll();
            }}
          >
            Move: ToDo
          </Button>
          <Button
            size="small"
            color="info"
            variant="outlined"
            onClick={() => {
              const payload = { ...card, status: StatusKanban.Doing };
              actions.updateCard(card.id, payload);
              actions.getAll();
            }}
          >
            Move: Going
          </Button>
          <Button
            size="small"
            color="warning"
            variant="outlined"
            onClick={() => {
              const payload = { ...card, status: StatusKanban.Done };
              actions.updateCard(card.id, payload);
              actions.getAll();
            }}
          >
            Move: Done
          </Button>
        </CardActions>
        <Divider />
        <CardActions>
          <Grid container spacing={2} direction="row" justifyContent="flex-end">
            <Grid item>
              <Button
                size="small"
                color="success"
                variant="contained"
                onClick={() => {
                  setDialog({
                    ...dialog,
                    open: true,
                    children: <FormKanban {...{ ...dialog, card }} />,
                  });
                }}
              >
                Edit
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={() =>
                  setDialog({
                    ...dialog,
                    open: true,
                    title: 'Confirm Exclusion?',
                    textButtonSubmit: 'Confirm',
                    children: (
                      <ActionButton
                        type="submit"
                        textButtonSubmit="Confirm"
                        confirm={() => {
                          actions.deleteCard(card.id);
                          dialog.onClose();
                        }}
                        cancel={() => dialog.onClose()}
                      />
                    ),
                  })
                }
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Paper>
  );
}

export default CardKanban;
