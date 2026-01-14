import { Skeleton, TableRow, TableCell, TableBody } from '@mui/material';

export const TableSkeleton = ({ rows = 5, cols = 7 }) => (
  <TableBody>
    {[...Array(rows)].map((_, i) => (
      <TableRow key={i}>
        {[...Array(cols)].map((_, j) => (
          <TableCell key={j}>
            <Skeleton animation="wave" height={24} />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
);
