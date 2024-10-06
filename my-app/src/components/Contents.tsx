// my-app/src/components/Content.tsx
import { Box, Typography } from '@mui/material';

const Content = () => {
  return (
    <Box sx={{ flex: 1, padding: 2 }}>
      <Typography variant="h6" component="h6">
        Content
      </Typography>
      {/* Add content here */}
    </Box>
  );
};

export default Content;