import { Box } from '@mui/material';
import { keyframes } from '@mui/system';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const PageTransition = ({ children }) => (
  <Box sx={{ animation: `${fadeIn} 0.3s ease-out` }}>
    {children}
  </Box>
);
