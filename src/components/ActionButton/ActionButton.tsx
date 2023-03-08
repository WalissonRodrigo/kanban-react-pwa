/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid } from '@mui/material';

function ActionButton(props: any) {
  const { confirm, cancel, textButtonSubmit, type = 'button' } = props;
  return (
    <Grid container spacing={2} direction="row" justifyContent="flex-end">
      <Grid item>
        <Button
          size="small"
          color="success"
          variant="contained"
          onClick={() => confirm()}
          type={type}
        >
          {textButtonSubmit || 'OK'}
        </Button>
      </Grid>
      <Grid item>
        <Button size="small" color="secondary" variant="contained" onClick={() => cancel()}>
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
}

export default ActionButton;
