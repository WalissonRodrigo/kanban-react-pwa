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

import MuiMarkdown from 'mui-markdown';

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
          <Typography component="p" variant="caption">
            Title:
          </Typography>
          <Typography component="h6" variant="h6">
            {card.title}
          </Typography>
          <Divider />
          <Typography component="p" variant="caption">
            Content:
          </Typography>
          <Typography component="div" variant="body1">
            <MuiMarkdown>{card.content}</MuiMarkdown>
          </Typography>

          <Divider style={{ marginTop: 32, marginBottom: 12 }} />
          <CardActions>
            {card.status !== StatusKanban.ToDo && (
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
                To Do
              </Button>
            )}
            {card.status !== StatusKanban.Doing && (
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
                Going
              </Button>
            )}
            {card.status !== StatusKanban.Done && (
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
                Done
              </Button>
            )}
          </CardActions>
          <Divider style={{ marginBottom: 24, marginTop: 12 }} />
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
                      title: `Edit Card Kanban: ${card.id}`,
                      children: (
                        <FormKanban
                          {...{ ...dialog, card, title: `Edit Card Kanban: ${card.id}` }}
                        />
                      ),
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
        </CardContent>
      </Card>
    </Paper>
  );
}

export default CardKanban;
