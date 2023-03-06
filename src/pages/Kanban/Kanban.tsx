/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

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

import Meta from '@/components/Meta';
import { FullSizeFlexBoxStart } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';
import { useCardActions } from '@/store/_actions';

let pulling: number | undefined;

function Kanban() {
  const isPortrait = useOrientation();
  const [cards, actions] = useCardActions();

  const startPulling = () => {
    clearInterval(pulling);
    const minute = 1000 * 60;
    pulling = setInterval(actions.getAll, minute * 1);
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

  return (
    <>
      <Meta title="Manager" />
      <FullSizeFlexBoxStart flexDirection={isPortrait ? 'column' : 'row'}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} style={{ height: '100vh', paddingLeft: 32 }}>
            <Grid container direction={'column'} spacing={2}>
              <Grid item xs={12}>
                <Typography component="p" variant="h5">
                  ToDo
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ overflowY: 'scroll', height: '100vh' }}>
                <Grid
                  container
                  direction={'column'}
                  flexWrap={'nowrap'}
                  alignItems={'flex-start'}
                  justifyContent={'flex-start'}
                  spacing={2}
                >
                  {cards
                    .filter((card) => card.status === 'ToDo')
                    .map((card) => (
                      <Grid item xs={12} key={card.id} style={{ marginTop: 0, paddingRight: 12 }}>
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
                            <CardActions>
                              <Button size="small" color="success" variant="contained">
                                Editar
                              </Button>
                              <Button size="small" color="secondary" variant="contained">
                                Apagar
                              </Button>
                            </CardActions>
                          </Card>
                        </Paper>
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} style={{ height: '100vh' }}>
            <Grid container direction={'column'} spacing={2}>
              <Grid item xs={12}>
                <Typography component="p" variant="h5">
                  Doing
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ overflowY: 'scroll', height: '100vh' }}>
                <Grid
                  container
                  direction={'column'}
                  flexWrap={'nowrap'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  spacing={2}
                >
                  {cards
                    .filter((card) => card.status === 'Doing')
                    .map((card) => (
                      <Grid item xs={12} key={card.id} style={{ marginTop: 0 }}>
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
                            <CardActions>
                              <Button size="small" color="info" variant="contained">
                                Editar
                              </Button>
                              <Button size="small" color="secondary" variant="contained">
                                Apagar
                              </Button>
                            </CardActions>
                          </Card>
                        </Paper>
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} style={{ height: '100vh', paddingRight: 32 }}>
            <Grid container direction={'column'} spacing={2}>
              <Grid item xs={12}>
                <Typography component="p" variant="h5">
                  Done
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ overflowY: 'scroll', height: '100vh' }}>
                <Grid
                  container
                  direction={'column'}
                  flexWrap={'nowrap'}
                  alignItems={'center'}
                  justifyContent={'flex-end'}
                  spacing={2}
                >
                  {cards
                    .filter((card) => card.status === 'Doing')
                    .map((card) => (
                      <Grid item key={card.id} style={{ marginTop: 0 }}>
                        <Paper elevation={3}>
                          <Card elevation={2}>
                            <CardContent>
                              <Typography component="h5" variant="h5">
                                {card.title}
                              </Typography>
                              <Divider />
                              <Typography component="h6" variant="h6">
                                {card.content}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button size="small" color="warning" variant="contained">
                                Editar
                              </Button>
                              <Button size="small" color="secondary" variant="contained">
                                Apagar
                              </Button>
                            </CardActions>
                          </Card>
                        </Paper>
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </FullSizeFlexBoxStart>
    </>
  );
}

export default Kanban;
