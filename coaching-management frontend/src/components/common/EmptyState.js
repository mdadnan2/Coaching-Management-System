import { Box, Typography, Button } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

export const EmptyState = ({ 
  icon: Icon = AccountCircle, 
  title = 'No data found', 
  description = 'Get started by adding your first item',
  actionLabel,
  onAction 
}) => (
  <Box sx={{ 
    textAlign: 'center', 
    py: 8,
    px: 2
  }}>
    <Icon sx={{ fontSize: 64, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
    <Typography variant="h6" color="text.primary" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
      {description}
    </Typography>
    {actionLabel && onAction && (
      <Button variant="contained" onClick={onAction}>
        {actionLabel}
      </Button>
    )}
  </Box>
);
