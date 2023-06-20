import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';

const fabStyle = {
  position: 'block',
};

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

export default function FloatingActionButtonZoom({ onClick }) {
  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: 'inherit',
      sx: { ...fabStyle, ...fabGreenStyle },
      icon: <AddIcon />,
      label: 'Expand',
      variant: 'extended',
      size:'small'
    },
  ];

  return (
    <Box sx={{ display: 'block' }}>
      <Zoom
        key={fabs[0].color}
        in={true}
        timeout={transitionDuration}
        style={{
          transitionDelay: `${transitionDuration.exit}ms`,
        }}
        unmountOnExit
        onClick={onClick ?? onClick}
      >
        <Fab sx={fabs[0].sx} aria-label={fabs[0].label} color={fabs[0].color} variant={fabs[0].variant} size={fabs[0]?.size}>
          {fabs[0].icon}
          Add new field
        </Fab>
      </Zoom>
    </Box>
  );
}
