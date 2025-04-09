import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { styles } from "./NavigationStyles";

export default function Navigation({ userRole = "user", userId = "anonymous" }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const [pendingBookings, setPendingBookings] = useState({});
  const [userNotifications, setUserNotifications] = useState([]);

  const isAdmin = userRole === "admin" || userRole === "superadmin";

  useEffect(() => {
    if (isAdmin) {
      fetchPendingBookings();
      const interval = setInterval(fetchPendingBookings, 5000);
      return () => clearInterval(interval);
    } else {
      fetchUserNotifications();
      const interval = setInterval(fetchUserNotifications, 5000);
      return () => clearInterval(interval);
    }
  }, [isAdmin, userId]);

  const fetchPendingBookings = () => {
    try {
      const storedPending = localStorage.getItem("pendingBookings");
      const storedBookings = localStorage.getItem("bookings");

      let pendingData = storedPending ? JSON.parse(storedPending) : {};
      const bookingsData = storedBookings ? JSON.parse(storedBookings) : {};

      Object.keys(pendingData).forEach(date => {
        Object.keys(pendingData[date]).forEach(key => {
          if (bookingsData[date]?.[key]?.status === "active") {
            delete pendingData[date][key];
          }
        });
        if (Object.keys(pendingData[date]).length === 0) {
          delete pendingData[date];
        }
      });

      setPendingBookings(pendingData);
    } catch (error) {
      console.error("Error fetching pending bookings:", error);
      setPendingBookings({});
    }
  };

  const fetchUserNotifications = () => {
    try {
      const storedUserNotifs = localStorage.getItem(`userNotifications_${userId}`);
      setUserNotifications(storedUserNotifs ? JSON.parse(storedUserNotifs) : []);
    } catch (error) {
      console.error("Error fetching user notifications:", error);
      setUserNotifications([]);
    }
  };

  const isMenuOpen = Boolean(anchorEl);
  const isNotifMenuOpen = Boolean(notifAnchorEl);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleNotifMenuOpen = (event) => setNotifAnchorEl(event.currentTarget);
  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotifAnchorEl(null);
  };

  const handleApprove = (date, key) => {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || {};
    const pending = JSON.parse(localStorage.getItem("pendingBookings")) || {};
    const booking = pending[date][key];

    if (!bookings[date]) bookings[date] = {};
    bookings[date][key] = {
      ...booking,
      status: "active",
      approvedBy: userRole,
      approvedAt: new Date().toISOString()
    };
    delete pending[date][key];

    if (Object.keys(pending[date]).length === 0) {
      delete pending[date];
    }

    // Safely handle roomId for user notification
    const roomName = typeof booking.roomId === 'string' && booking.roomId.includes('-')
      ? booking.roomId.split('-')[0]
      : 'Unknown Room';

    // Add notification for the user
    const userNotifs = JSON.parse(localStorage.getItem(`userNotifications_${booking.user}`)) || [];
    userNotifs.unshift({
      id: Date.now(),
      message: "Your booking has been approved",
      timestamp: new Date().toISOString(),
      status: "approved",
      bookingDetails: {
        title: booking.title || 'Untitled',
        date: booking.date || date,
        startTime: booking.startTime || 'Unknown Time',
        room: roomName
      }
    });
    localStorage.setItem(`userNotifications_${booking.user}`, JSON.stringify(userNotifs));

    localStorage.setItem("bookings", JSON.stringify(bookings));
    localStorage.setItem("pendingBookings", JSON.stringify(pending));
    fetchPendingBookings();
  };

  const handleDecline = (date, key) => {
    const pending = JSON.parse(localStorage.getItem("pendingBookings")) || {};
    const booking = pending[date][key];
    delete pending[date][key];

    if (Object.keys(pending[date]).length === 0) {
      delete pending[date];
    }

    // Safely handle roomId for user notification
    const roomName = typeof booking.roomId === 'string' && booking.roomId.includes('-')
      ? booking.roomId.split('-')[0]
      : 'Unknown Room';

    // Add notification for the user
    const userNotifs = JSON.parse(localStorage.getItem(`userNotifications_${booking.user}`)) || [];
    userNotifs.unshift({
      id: Date.now(),
      message: "Your booking has been declined",
      timestamp: new Date().toISOString(),
      status: "declined",
      bookingDetails: {
        title: booking.title || 'Untitled',
        date: booking.date || date,
        startTime: booking.startTime || 'Unknown Time',
        room: roomName
      }
    });
    localStorage.setItem(`userNotifications_${booking.user}`, JSON.stringify(userNotifs));

    localStorage.setItem("pendingBookings", JSON.stringify(pending));
    fetchPendingBookings();
  };

  const menuId = "primary-search-account-menu";
  const notifMenuId = "primary-notifications-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const renderNotificationsMenu = (
    <Menu
      anchorEl={notifAnchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      id={notifMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isNotifMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        style: {
          maxHeight: "400px",
          width: "400px",
        },
      }}
    >
      {isAdmin ? (
        Object.entries(pendingBookings)
          .flatMap(([date, bookings]) =>
            Object.entries(bookings).map(([key, booking]) => ({ date, key, ...booking }))
          )
          .slice(0, 6)
          .map((notif, index) => {
            const roomName = typeof notif.roomId === 'string'
              ? notif.roomId.split('-')[0]
              : notif.key.split('-')[0];
            const time = typeof notif.roomId === 'string'
              ? notif.roomId.split('-')[1]
              : notif.key.split('-')[1];

            return (
              <MenuItem
                key={index}
                sx={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "12px",
                  backgroundColor: '#BBDEFB' // Light blue for pending
                }}
              >
                <Typography variant="body2" sx={{ mb: 1 }}>
                  New booking request for <strong>{notif.title || 'Untitled'}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Room: {roomName || 'Unknown Room'}<br />
                  Date: {notif.date || 'No date'}<br />
                  Time: {notif.startTime || time || 'No time'}<br />
                  Duration: {notif.duration || 'N/A'}<br />
                  Description: {notif.description || 'No description'}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleApprove(notif.date, notif.key)}
                    sx={{ bgcolor: "#4CAF50", "&:hover": { bgcolor: "#45a049" } }}
                  >
                    Approve
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleDecline(notif.date, notif.key)}
                    sx={{ bgcolor: "#f44336", "&:hover": { bgcolor: "#da190b" } }}
                  >
                    Decline
                  </Button>
                </Box>
              </MenuItem>
            );
          })
      ) : (
        userNotifications.slice(0, 6).map((notif, index) => (
          <MenuItem
            key={index}
            sx={{
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "12px",
              backgroundColor: notif.status === "approved" ? '#1976D2' : '#FFCDD2' // Dark blue for approved, light red for declined
            }}
          >
            <Typography variant="body2" sx={{ mb: 1, color: notif.status === "approved" ? 'white' : 'black' }}>
              {notif.message}
            </Typography>
            <Typography variant="body2" sx={{ color: notif.status === "approved" ? '#E3F2FD' : '#666' }}>
              {notif.bookingDetails ? (
                <>
                  Booking: {notif.bookingDetails.title}<br />
                  Room: {notif.bookingDetails.room}<br />
                  Date: {notif.bookingDetails.date}<br />
                  Time: {notif.bookingDetails.startTime}<br />
                  {new Date(notif.timestamp).toLocaleString()}
                </>
              ) : (
                new Date(notif.timestamp).toLocaleString()
              )}
            </Typography>
          </MenuItem>
        ))
      )}
      {(isAdmin && Object.keys(pendingBookings).length === 0) || (!isAdmin && userNotifications.length === 0) ? (
        <MenuItem>
          <Typography variant="body2">No new notifications</Typography>
        </MenuItem>
      ) : null}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={styles.appBar}>
        <Toolbar sx={styles.toolbar}>
          <Typography variant="h6" noWrap component="div" sx={styles.title}>
            BookMeetingRooms
          </Typography>

          <Box sx={styles.iconsContainer}>
            <IconButton
              size="large"
              color="inherit"
              sx={styles.notificationButton}
              onClick={handleNotifMenuOpen}
            >
              <Badge
                badgeContent={
                  isAdmin
                    ? Object.values(pendingBookings).flatMap(Object.keys).length
                    : userNotifications.length
                }
                color="error"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Box sx={styles.profileSection}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={styles.profileIconButton}
              >
                <AccountCircle />
              </IconButton>
              <Typography variant="body1" sx={styles.profileText}>
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </Typography>
              <ArrowDropDownIcon sx={styles.dropdownIcon} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderNotificationsMenu}
    </Box>
  );
}