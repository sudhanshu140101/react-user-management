import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Typography,
  Button,
  Box,
  Avatar,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  Email,
  Phone,
  Language,
  Business,
  LocationCity,
  Person,
} from "@mui/icons-material";
import "./UserDetails.css";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = () => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <Box className="loading-container">
        <CircularProgress size={60} />
        <Typography variant="h6" className="loading-text">
          Loading user details...
        </Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box className="error-container">
        <Typography variant="h6">User not found</Typography>
      </Box>
    );
  }

  // Flat list data with icons
  const detailsList = [
    { 
      label: "Email", 
      value: user.email, 
      icon: <Email className="list-icon" /> 
    },
    { 
      label: "Phone", 
      value: user.phone, 
      icon: <Phone className="list-icon" /> 
    },
    { 
      label: "Website", 
      value: user.website, 
      icon: <Language className="list-icon" /> 
    },
    { 
      label: "Company", 
      value: user.company?.name || "N/A", 
      icon: <Business className="list-icon" /> 
    },
    { 
      label: "City", 
      value: user.address?.city || "N/A", 
      icon: <LocationCity className="list-icon" /> 
    },
  ];

  return (
    <Box className="user-details-container">
      <Paper elevation={3} className="user-details-paper">
        {/* Header Section */}
        <Box className="user-header">
          <Avatar className="user-avatar">
            <Person />
          </Avatar>
          <Typography variant="h4" className="user-name">
            {user.name}
          </Typography>
          <Typography variant="subtitle1" className="user-username">
            @{user.username}
          </Typography>
        </Box>

        <Divider className="header-divider" />

        {/* Details List */}
        <List className="details-list">
          {detailsList.map(({ label, value, icon }, index) => (
            <ListItem key={label} className="detail-item">
              <ListItemIcon className="detail-icon">
                {icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1" className="detail-label">
                    {label}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" className="detail-value">
                    {value}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

        <Divider className="actions-divider" />

        {/* Action Buttons */}
        <Box className="actions-container">
          <Button 
            variant="contained" 
            onClick={fetchUser}
            className="refresh-button"
          >
            Refresh Data
          </Button>
          <Button 
            component={Link} 
            to="/" 
            variant="outlined"
            className="back-button"
          >
            ⬅ Back to User List
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

