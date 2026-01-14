import { Box, CircularProgress, Typography } from '@mui/material';

export const LoadingOverlay = ({ message = 'Loading...' }) => (
  <Box sx={{ 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center',
    minHeight: 300,
    gap: 2
  }}>
    <CircularProgress />
    <Typography variant="body2" color="text.secondary">
      {message}
    </Typography>
  </Box>
);
