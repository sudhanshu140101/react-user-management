import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
  CircularProgress,
  Paper,
  Divider,
  Chip,
  IconButton,
  Tooltip
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  ArrowForwardIos as ArrowIcon,
  Favorite as FavoriteIcon
} from "@mui/icons-material";
import "./UserList.css";

export default function UserList() {
  // Simple state management
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  // Fetch users function
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  // Toggle favorite function
  const toggleFavorite = (userId) => {
    if (favorites.includes(userId)) {
      setFavorites(favorites.filter(id => id !== userId));
    } else {
      setFavorites([...favorites, userId]);
    }
  };

  // Load users on start
  useEffect(() => {
    fetchUsers();
  }, []);

  // Loading screen
  if (loading) {
    return (
      <Box className="loading-container">
        <CircularProgress size={60} color="primary" />
        <Typography variant="h6" className="loading-text">
          Loading Users...
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" className="app-container">
      
      {/* Header Section */}
      <Paper elevation={4} className="header-paper">
        <Box className="header-box">
          <Box className="title-box">
            <PeopleIcon className="people-icon" />
            <Typography variant="h4" className="main-title">
              Users Directory
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={fetchUsers}
            className="refresh-button"
            size="large"
          >
            Refresh
          </Button>
        </Box>
      </Paper>

      {/* Stats Chip */}
      <Box className="stats-container">
        <Chip 
          label={`${users.length} Users Found`} 
          color="primary" 
          variant="outlined" 
          className="stats-chip"
        />
        <Chip 
          label={`${favorites.length} Favorites`} 
          color="secondary" 
          variant="outlined" 
          className="stats-chip"
        />
      </Box>

      {/* Users List */}
      <Paper elevation={3} className="list-paper">
        <List className="user-list">
          {users.map((user, index) => (
            <React.Fragment key={user.id}>
              
              <ListItem className="list-item" disablePadding>
                
                {/* Main clickable area */}
                <ListItemButton 
                  component={Link} 
                  to={`/user/${user.id}`}
                  className="list-button"
                >
                  
                  {/* User Avatar */}
                  <ListItemAvatar>
                    <Avatar className="user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>

                  {/* User Name */}
                  <ListItemText
                    primary={
                      <Typography variant="h6" className="user-name">
                        {user.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" className="user-username">
                        @{user.username.toLowerCase()}
                      </Typography>
                    }
                  />

                  {/* Arrow Icon */}
                  <ArrowIcon className="arrow-icon" />
                  
                </ListItemButton>

                {/* Favorite Button */}
                <Tooltip title="Add to Favorites">
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(user.id);
                    }}
                    className={`favorite-button ${favorites.includes(user.id) ? 'favorite-active' : ''}`}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>

              </ListItem>

              {/* Divider line */}
              {index < users.length - 1 && (
                <Divider variant="inset" component="li" className="list-divider" />
              )}

            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Footer */}
      <Paper elevation={2} className="footer-paper">
        <Typography variant="body1" className="footer-text">
          Click on any user to view details
        </Typography>
      </Paper>

    </Container>
  );
}

