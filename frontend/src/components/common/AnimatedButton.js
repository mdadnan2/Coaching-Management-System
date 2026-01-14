import { Button } from '@mui/material';
import { motion } from 'framer-motion';

const MotionButton = motion(Button);

export const AnimatedButton = ({ children, ...props }) => (
  <MotionButton
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.15 }}
    {...props}
  >
    {children}
  </MotionButton>
);
