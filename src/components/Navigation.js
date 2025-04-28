// import React, { useState } from 'react';
// import { AppBar, Box, Toolbar, IconButton, Typography, Badge, Menu, MenuItem } from '@mui/material';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// export default function Navigation() {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const isMenuOpen = Boolean(anchorEl);

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const menuId = 'primary-search-account-menu';
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
//       <MenuItem onClick={handleMenuClose}>My account</MenuItem>
//       <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
//     </Menu>
//   );

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static"  sx={{backgroundColor: "#FFFFFF", 
//         color:"black", 
//         zIndex:1301, 
//         boxShadow:'none',
//         borderBottom:'1px solid rgba(136,136,136,0.1)',
//         }}>
        
//         <Toolbar sx={{height:'100%',
//             display: 'flex',
//             justifyContent:'space-between',
//             alignItems:'center',
//             padding:'0 24px !important' 
//         }}>
//             {/* title */}
//           <Typography variant="h6" noWrap component="div" sx={{ 
//             width:'247px',
//             height:'30px',
//             fontFamily:'Plus Jakarta Sans',
//             fontSize: '24px',
//             fontWeight: 600,
//             lineHeight: '30.24px',
//             color: '#1A1A1A'
//              }}>
//             BookMeetingRooms
//           </Typography>

//           {/* Icons container */}

//           <Box sx={{
//             display: 'flex',
//             alignItems: 'center',
//             width:'220px',
//             height: '42px',
//             gap: '15px',
//             justifyContent: 'flex-end'
//           }}>

//           {/* NotificationsIcon */}

//           <IconButton 
//           size="large" 
//           color="inherit"
//           sx={{
//             width:'42px',
//             height: '42px',
//             padding: 0,
//           }}
//           >
//             <Badge color="error">
//               <NotificationsIcon />
//             </Badge>
//           </IconButton>

//           {/* profilesection */}

//           <Box sx={{display: 'flex', 
//             alignItems: 'center',
//             width:'136px',
//             height:'38px',
//             gap:'10px'
//             }}>

//           <IconButton
//             size="large"
//             edge="end"
//             aria-label="account of current user"
//             aria-controls={menuId}
//             aria-haspopup="true"
//             onClick={handleProfileMenuOpen}
//             color="inherit"
//             sx={{
//                 width:'38px',
//                 height: '38px',
//                 borderRadius:'100px 0px 0px 0px',
//                 padding: 0
//             }}  
//           >
//             <AccountCircle />
//           </IconButton>
//           <Typography 
//            variant="body1" 
//            sx={{
//               fontFamily:'Inter',
//               fontSize:'14px',
//               fontWeight: 500,
//               lineHeight:'16.94px',
//               width: '88px',
//               height: '17px',
              
//             }}>
//             User
//           </Typography>

//            {/* <IconButton
//            sx={{
//              width: '17px',
//              height: '17px',
//              borderRadius: '3.24px 0px 0px 0px',
//              padding: 0
//            }}> */}
     
          
          
//           <ArrowDropDownIcon 
//           sx={{
//             width: '16px,',
//             height: '16px',
//             color: '#6B7280',
//             //border: '1.33px solid #5F5F5F',
//             transform: 'rotate(0deg)'
//             }} />
//           {/* </IconButton> */}
//           </Box>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       {renderMenu}
//     </Box>
//   );
// }


//this works fine
// import React, { useState, useEffect } from 'react';
// import { AppBar, Box, Toolbar, IconButton, Typography, Badge, Menu, MenuItem } from '@mui/material';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import { roomBookedUsers } from "./UserData";

 
// export default function Navigation() {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [notifAnchorEl, setNotifAnchorEl] = useState(null);
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     // Assuming userdata contains notifications inside a "notifications" property
//     if (roomBookedUsers?.notifications) {
//       setNotifications(roomBookedUsers.notifications);
//     }
//     else {
//       setNotifications([]); // or set some default message
//     }
//   }, [roomBookedUsers]);

//   const isMenuOpen = Boolean(anchorEl);
//   const isNotifMenuOpen = Boolean(notifAnchorEl);

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleNotifMenuOpen = (event) => {
//     setNotifAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setNotifAnchorEl(null);
//   };

//   const menuId = 'primary-search-account-menu';
//   const notifMenuId = 'primary-notifications-menu';

//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
//       <MenuItem onClick={handleMenuClose}>My account</MenuItem>
//       <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
//     </Menu>
//   );

//   const renderNotificationsMenu = (
//     <Menu
//       anchorEl={notifAnchorEl}
//       anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//       id={notifMenuId}
//       keepMounted
//       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       open={isNotifMenuOpen}
//       onClose={handleMenuClose}
//     >
//       {notifications.length > 0 ? (
//         notifications.map((notif) => (
//           <MenuItem key={notif.id}>
//             <Typography variant="body2">
//               <strong>{notif.user}</strong> {notif.action} <strong>{notif.resource}</strong> - {notif.time}
//             </Typography>
//           </MenuItem>
//         ))
//       ) : (
//         <MenuItem>
//           <Typography variant="body2">No new notifications</Typography>
//         </MenuItem>
//       )}
//     </Menu>
//   );

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar
//         position="static"
//         sx={{
//           backgroundColor: "#FFFFFF",
//           color: "black",
//           zIndex: 1301,
//           boxShadow: 'none',
//           borderBottom: '1px solid rgba(136,136,136,0.1)',
//         }}
//       >
//         <Toolbar
//           sx={{
//             height: '100%',
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             padding: '0 24px !important'
//           }}
//         >
//           {/* Title */}
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{
//               width: '247px',
//               height: '30px',
//               fontFamily: 'Plus Jakarta Sans',
//               fontSize: '24px',
//               fontWeight: 600,
//               lineHeight: '30.24px',
//               color: '#1A1A1A'
//             }}
//           >
//             BookMeetingRooms
//           </Typography>

//           {/* Icons container */}
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               width: '220px',
//               height: '42px',
//               gap: '15px',
//               justifyContent: 'flex-end'
//             }}
//           >
//             {/* Notifications Icon */}
//             <IconButton
//               size="large"
//               color="inherit"
//               sx={{
//                 width: '42px',
//                 height: '42px',
//                 padding: 0,
//               }}
//               onClick={handleNotifMenuOpen}
//             >
//               <Badge badgeContent={notifications.length} color="error">
//                 <NotificationsIcon />
//               </Badge>
//             </IconButton>

//             {/* Profile Section */}
//             <Box
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 width: '136px',
//                 height: '38px',
//                 gap: '10px'
//               }}
//             >
//               <IconButton
//                 size="large"
//                 edge="end"
//                 aria-label="account of current user"
//                 aria-controls={menuId}
//                 aria-haspopup="true"
//                 onClick={handleProfileMenuOpen}
//                 color="inherit"
//                 sx={{
//                   width: '38px',
//                   height: '38px',
//                   borderRadius: '100px 0px 0px 0px',
//                   padding: 0
//                 }}
//               >
//                 <AccountCircle />
//               </IconButton>
//               <Typography
//                 variant="body1"
//                 sx={{
//                   fontFamily: 'Inter',
//                   fontSize: '14px',
//                   fontWeight: 500,
//                   lineHeight: '16.94px',
//                   width: '88px',
//                   height: '17px',
//                 }}
//               >
//                 User
//               </Typography>
//               <ArrowDropDownIcon
//                 sx={{
//                   width: '16px',
//                   height: '16px',
//                   color: '#6B7280',
//                   transform: 'rotate(0deg)'
//                 }}
//               />
//             </Box>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       {renderMenu}
//       {renderNotificationsMenu}
//     </Box>
//   );
// }

//this gives the notification while canceling the booking
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

export default function Navigation({ userRole = "user" }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const [pendingBookings, setPendingBookings] = useState({});

  const isAdmin = userRole === "admin" || userRole === "superadmin";

  // useEffect(() => {
  //   if (isAdmin) {
  //     fetchPendingBookings();
  //     const interval = setInterval(fetchPendingBookings, 5000);
  //     return () => clearInterval(interval);
  //   }
  // }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) {
      fetchPendingBookings();
      const interval = setInterval(fetchPendingBookings, 5000);
      const listener = () => fetchPendingBookings();
      window.addEventListener('pendingBookingsUpdated', listener);
  
      return () => {
        clearInterval(interval);
        window.removeEventListener('pendingBookingsUpdated', listener);
      };
    }
  }, [isAdmin]);

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

    localStorage.setItem("bookings", JSON.stringify(bookings));
    localStorage.setItem("pendingBookings", JSON.stringify(pending));
    fetchPendingBookings();
  };

  const handleDecline = (date, key) => {
    const pending = JSON.parse(localStorage.getItem("pendingBookings")) || {};
    delete pending[date][key];
    
    if (Object.keys(pending[date]).length === 0) {
      delete pending[date];
    }
    
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
      {Object.entries(pendingBookings)
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
        })}
      {Object.keys(pendingBookings).length === 0 && (
        <MenuItem>
          <Typography variant="body2">No pending booking requests</Typography>
        </MenuItem>
      )}
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
            {isAdmin && (
              <IconButton
                size="large"
                color="inherit"
                sx={styles.notificationButton}
                onClick={handleNotifMenuOpen}
              >
                <Badge
                  badgeContent={Object.values(pendingBookings).flatMap(Object.keys).length}
                  color="error"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            )}

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
      {isAdmin && renderNotificationsMenu}
    </Box>
  );
}