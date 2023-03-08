import { Fab, SxProps, Zoom } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const fabStyle = {
  position: 'fixed',
  bottom: 16,
  right: 16,
};

function FabButton({ ...rest }) {
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fab = {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 200,
    color: 'primary',
    sx: fabStyle as SxProps,
    icon: rest.icon,
    label: 'Add',
  };
  return (
    <Zoom
      in
      timeout={transitionDuration}
      style={{
        transitionDelay: `${100}ms`,
      }}
      unmountOnExit
    >
      <Fab sx={fab.sx} aria-label={fab.label} color={'info'} onClick={rest.onClick}>
        {fab.icon}
      </Fab>
    </Zoom>
  );
}

export default FabButton;
