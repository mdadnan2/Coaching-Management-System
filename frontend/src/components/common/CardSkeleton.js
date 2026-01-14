import { Card, Skeleton, Box } from '@mui/material';

export const CardSkeleton = () => (
  <Card sx={{ p: 3, height: '8rem', display: 'flex', justifyContent: 'space-between' }}>
    <Box sx={{ flex: 1 }}>
      <Skeleton width="60%" height={32} />
      <Skeleton width="40%" height={48} sx={{ mt: 1 }} />
    </Box>
    <Skeleton variant="circular" width={48} height={48} />
  </Card>
);
