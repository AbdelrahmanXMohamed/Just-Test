import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import Page1 from './page/Page1';
import Page2 from './page/Page2';
import Page3 from './page/Page3';
import Login from './page/Login';

import './App.css'
const drawerWidth = 240;

export default function App() {
  let Links = [{ name: 'Page 1', link: '/page1' }, { name: 'Page 2', link: '/page2' }, { name: 'Page 3', link: '/page3' }]
  let navigate = useNavigate();
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {Links.map(({ name, link }, index) => (
          <ListItem button key={index} onClick={() => navigate(link)}>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {"Test"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >

        <Toolbar />
        <Routes>

          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
          <Route path="/" element={<Login />} />
        </Routes>

      </Box>
    </Box>
  );
}
/*

          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
          <Route path="/" element={<Login />} />

        */