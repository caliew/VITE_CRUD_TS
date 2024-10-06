// my-app/src/components/Header.tsx
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfig } from '../config';
import HomeIcon from '../assets/verified.svg';
import { logout } from '../redux/features/authSlice';

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/')
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'block'}}>
        <div style={{ margin:'5px' }}>
          <IconButton edge="start" color="inherit" >
            <img src={HomeIcon} style={{width: 64, height: 64}} alt="Home Icon" />
            <Typography variant="headerTitle" >
              {AppConfig.applicationName}
            </Typography>
          </IconButton>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px'}}>
          <Link to="/home"><Typography variant="headerMenu" >HOME</Typography></Link>
          { token && (
            <>
              <Link to="/restaurants"><Typography variant="headerMenu">RESTAURANTS</Typography></Link>
              <Link to="/workers"><Typography variant="headerMenu" >WORKERS</Typography></Link>
            </>
           )}
           <Typography variant="headerMenu" sx={{ cursor: 'pointer' }} onClick={handleLogout}>LOGOUT</Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;