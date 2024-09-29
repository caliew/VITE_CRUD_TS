// my-app/src/components/Sidebar.tsx
import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import WorkIcon from '@mui/icons-material/Work';

const Sidebar = () => {
  return (
    <List>
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText>
        <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>HOME</Typography>
        </ListItemText>
      </ListItem>
      <ListItem button component={Link} to="/restaurants">
        <ListItemIcon>
          <RestaurantIcon />
        </ListItemIcon>
        <ListItemText>
        <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>RESTAURANTS</Typography>
        </ListItemText>
      </ListItem>
      <ListItem button component={Link} to="/workers">
        <ListItemIcon>
          <WorkIcon />
        </ListItemIcon>
        <ListItemText>
        <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>WORKERS</Typography>
        </ListItemText>
      </ListItem>
    </List>
  );
};

export default Sidebar;