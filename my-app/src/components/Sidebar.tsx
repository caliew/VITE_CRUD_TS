// my-app/src/components/Sidebar.tsx
import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ViewTimelineTwoToneIcon from '@mui/icons-material/ViewTimelineTwoTone';
import WorkIcon from '@mui/icons-material/Work';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

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
      <ListItem button component={Link} to="/bookings">
        <ListItemIcon>
          <ViewTimelineTwoToneIcon />
        </ListItemIcon>
        <ListItemText>
        <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>BOOKINGS</Typography>
        </ListItemText>
      </ListItem>
      <ListItem button component={Link} to="/facilities">
        <ListItemIcon>
          <WorkIcon />
        </ListItemIcon>
        <ListItemText>
        <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>FACILITIES</Typography>
        </ListItemText>
      </ListItem>
      <ListItem button component={Link} to="/visitors">
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText>
        <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>VISITORS</Typography>
        </ListItemText>
      </ListItem>
    </List>
  );
};

export default Sidebar;