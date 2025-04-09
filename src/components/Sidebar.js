// // this code will work well
import React, { useState, useEffect } from 'react';
import { Drawer, ListItem, ListItemIcon, ListItemText, Box, Typography, Modal, Button, TextField, Select, MenuItem, FormControlLabel, Switch, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CloseIcon from '@mui/icons-material/Close';
import indium from "../assets/indium.png";
import styles from './SidebarStyles';
import PeopleIcon from '@mui/icons-material/People';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useNavigate } from 'react-router-dom';
const Sidebar = ({ userRole }) => {
  const navigate = useNavigate();
  const [openLocationModal, setOpenLocationModal] = useState(false);
  // const [openRoomModal, setOpenRoomModal] = useState(false);
  const role = userRole || "";
  const isSuperAdmin = role === "SuperAdmin" || role === "SuperAdmin";
  const isAdmin = userRole === "Admin" || userRole === "SuperAdmin";
  // const [rooms, setRooms] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const [locations, setLocations] = useState([]); // Store created locations
  const [locationName, setLocationName] = useState("");
  const [shortName, setShortName] = useState("");
  const [bookingWindow, setBookingWindow] = useState(60);
  const [noticeDuration, setNoticeDuration] = useState(15);
  const [recurrenceCount, setRecurrenceCount] = useState(15);
  const [adminUser, setAdminUser] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleCreateLocation = () => {
    const newLocation = {
      locationName,
      shortName,
      bookingWindow,
      noticeDuration,
      recurrenceCount,
      adminUser,
      isActive,
    };
  // Simulate an API call to save the location
  setTimeout(() => {
    console.log("Fake API call: Location saved to server");
    setSnackbar({
    open: true,
    message: 'Location created successfully!',
    severity: 'success'
    });
  }, 1000);
    setLocations((prev) => [...prev, newLocation]); // Save to frontend state
    console.log("Created Location:", newLocation); // Log the created location
    setOpenLocationModal(false); // Close the modal
  };
   const handleNumberInput = (setter) => (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value !== "") {
      setter(Number(value)); // Convert input to a number
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };
    
  return (
    <Drawer variant="permanent" sx={styles.drawer}>
      <Box sx={styles.mainContainer}>
        <Box sx={styles.logoContainer}>
          <Box sx={styles.innerLogoContainer}></Box>
        </Box>
        <Box component="img" src={indium} alt="Indium" sx={styles.image} />
      </Box>
      <Box sx={styles.sectionContainer}>
        <Typography sx={styles.generalText}>General</Typography>
        <Box sx={styles.bookMeetingAdminContainer}>
          <ListItem button sx={styles.bookMeetingButton}>
            <ListItemIcon sx={styles.listItemIcon}>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Book Meeting" sx={styles.menuText} />
          </ListItem>
          <ListItem button sx={styles.adminButton} onClick={() => navigate('/admin/reports')}>
            <ListItemIcon sx={styles.listItemIcon}>
            <AssessmentIcon />
              {/* <AdminPanelSettingsIcon /> */}
            </ListItemIcon>
            
            <ListItemText primary="Reports" sx={styles.menuText} onClick={() => window.location.href = '/admin/reports'} />
            {/* <ListItemText primary="Reports" sx={styles.menuText} /> */}
          </ListItem>
        </Box>
        <Box sx={styles.adminShowButtons}>
           {isAdmin && (
            <>
            {isSuperAdmin && (
              <ListItem button sx={styles.createLocationButton} onClick={() => setOpenLocationModal(true)}>
                <ListItemIcon sx={styles.listItemIcon}>
                  <AddLocationIcon />
                </ListItemIcon>
                <ListItemText primary="Create New Location" sx={styles.menuText} />
              </ListItem>
   )}
              {/* <ListItem button sx={styles.createRoomButton} onClick={() => setOpenRoomModal(true)}> */}
              {/* <ListItem>
                <ListItemIcon sx={styles.listItemIcon}>
                  <MeetingRoomIcon />
                </ListItemIcon>
                <ListItemText primary="Create Room" sx={styles.menuText} />
              </ListItem> */}
            </>
          )}
        </Box>
        <Box sx={styles.helpSettingsContainer}>
          <Box sx={styles.helpSettingsBox}>
            <ListItem button sx={styles.helpButton}>
              <ListItemIcon sx={styles.listItemIcon}>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Help & Center" sx={styles.menuText} />
            </ListItem>
            <ListItem button sx={styles.settingsButton}>
              <ListItemIcon sx={styles.listItemIcon}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" sx={styles.menuText} />
            </ListItem>
          </Box>
        </Box>
      </Box>

      {/* Create Location Modal with all fields */}
      <Modal open={openLocationModal} onClose={() => setOpenLocationModal(false)}>
        {/* Modalcontainer */}
        <Box sx={styles.modalContainer
          
        }>
          {/* modalHeader */}
          <Box sx={styles.modalHeader
            
          }>
            <Typography variant="h6">Create Location</Typography>
            <IconButton onClick={() => setOpenLocationModal(false)} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>

        {/* modalbody */}
          <Box sx={ styles.modalBody
            
            }>
            <Box sx={{ mb: 2}}>
               {/* nameandshortbox */}
              <Box sx={styles.nameandShortNameBox}>
                  {/*namebox */}
              <Box sx={styles.nameBox}>
              <Typography variant="body2" sx={styles.nameText}>
                Location Name</Typography>
              <TextField 
                fullWidth 
                variant="outlined"
                placeholder="Type"
                size="small"
                sx={styles.nameTextField}
              />
              </Box>
              <Box sx={styles.shortNameBox
                }>
              <Typography variant="body2" sx={styles.shortNameText}>
                Short name ( Olympia Tech Park - OTP )</Typography>
              <TextField 
                fullWidth 
                variant="outlined"
                placeholder="Type"
                size="small"
                sx={styles.shortNameTextField}
              />
              </Box>
              </Box>

          
              
             {/* Added fields in a more compact layout */}
              <Box sx={styles.timeBox}>
                <Box sx={styles.bookingWindowBox}>
                  <Typography variant="body2" sx={styles.bookingText }>
                    Booking Allowed Window In Days (Max: 60)</Typography>
                  <TextField 
                    fullWidth 
                    variant="outlined"
                    placeholder="60"
                    size="small"
                    sx={styles.bookingTextField  }
                     
                  
                    value={bookingWindow}
                    onChange={(e) => handleNumberInput(e, setBookingWindow, 60)}
                    inputProps={{ 
                      maxLength: 2,
                      inputMode: 'numeric',
                      
                    }}
                    helperText={parseInt(bookingWindow) > 60 ? "Value should not exceed 60" : ""}
                    error={parseInt(bookingWindow) > 60}
                  />
                </Box>
                
                <Box sx={styles.durationBox  }>
                 
                
                  <Typography variant="body2" sx={styles.durationText}>
                    Notice Duration To Book In Min (Max: 15)</Typography>
                  <TextField 
                    fullWidth 
                    variant="outlined"
                    placeholder="15"
                    size="small"
                    sx={styles.durationTextField }
                   
                    value={noticeDuration}
                    onChange={(e) => handleNumberInput(e, setNoticeDuration, 60)}
                    inputProps={{ 
                      maxLength: 2,
                      inputMode: 'numeric'
                    }}
                    helperText={parseInt(noticeDuration) > 15 ? "Value should not exceed 60" : ""}
                    error={parseInt(noticeDuration) > 15}
                  />
                </Box>
                <Box sx={styles.recurrenceBox}>
                  
                  <Typography variant="body2" sx={ styles.recurrenceText}>
                    
                    
                    Recurrence Count Allowed (Max: 20)</Typography>
                  <TextField 
                    fullWidth 
                    variant="outlined"
                    placeholder="15"
                    size="small"
                    sx={styles.recurrenceTextField  }
                      
                  
                    value={recurrenceCount}
                    onChange={(e) => handleNumberInput(e, setRecurrenceCount, 20)}
                    inputProps={{ 
                      maxLength: 2,
                      inputMode: 'numeric'
                    }}
                    helperText={parseInt(recurrenceCount) > 15 ? "Value should not exceed 20" : ""}
                    error={parseInt(recurrenceCount) > 15}
                  />
                </Box>
              </Box>
              
              
              {/* <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr',
                gap: 2
              }}> */}
                {/* <Box sx={{width:"170px",height:"62px",top:"336px",left:"298px"}}>
                  <Typography variant="body2" sx={{ mb: 1,width:"170px",height:"16px",size:"13px",lineHeight:"15.73px" }}>Recurrence Count Allowed (Max: 20)</Typography>
                  <TextField 
                    fullWidth 
                    variant="outlined"
                    placeholder="15"
                    size="small"
                    value={recurrenceCount}
                    onChange={(e) => handleNumberInput(e, setRecurrenceCount, 20)}
                    inputProps={{ 
                      maxLength: 2,
                      inputMode: 'numeric'
                    }}
                    helperText={parseInt(recurrenceCount) > 20 ? "Value should not exceed 20" : ""}
                    error={parseInt(recurrenceCount) > 20}
                  />
                </Box> */}
                {/* </Box>
                </Box> */}

                <Box sx={styles.adminActiveBox }>
                
               
           
              {/* <Box> */}
              <Box sx={styles.adminUserBox}>
                
                
              <Typography variant="body2" sx={styles.adminUserText }>Admin Users</Typography>
                
               
              <Select
                fullWidth
                displayEmpty
                variant="outlined"
                renderValue={(selected) => selected ? selected : "Select"}
                size="small"
                sx={ styles.adminUserTextField }                
              >
                <MenuItem value="" disabled>Select</MenuItem>
                <MenuItem value={1}>User 1</MenuItem>
                <MenuItem value={2}>User 2</MenuItem>
                <MenuItem value={3}>User 3</MenuItem>
              </Select>
              </Box>

                <Box sx={styles.activeBox} >                  
                  <Typography variant="body2" sx={styles.activeText}>Is Active</Typography> 
                    
                  <Box sx={ styles.activeToggle }>
                   
                    <Switch />
                    <Typography variant="body2" color="text.secondary" sx={ styles.noText  }>No</Typography>

                  
                  </Box>
                </Box>
                {/* </Box>   */}
                </Box>
                 
                </Box>
                </Box>
            
            <Box sx={styles.cancelCreateBox }>
              
           
              <Box sx={styles.cancelBox}>
              <Button 
                onClick={() => setOpenLocationModal(false)}
                sx={styles.cancelButton }
                 
               
              >
                Cancel
              </Button>
              </Box>
              <Box sx={styles.crearteBox}>
              <Button 
                variant="contained" 
                onClick={handleCreateLocation}
                sx={styles.createButton }
              >
                Create
              </Button>
              </Box>
            </Box>
        </Box>
      </Modal>

      {/* Create Room Modal (Updated with form handling) */}
      {/* <Modal open={openRoomModal} onClose={() => setOpenRoomModal(false)}>
        <Box sx={{
          position: 'absolute',
          top: "244px",
          left: "600px",
          transform: 'translate(-50%, -50%)',
          width: "930px",
          height: "489px",
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          p: 0,
          outline: 'none',
        }}>
          <Box sx={styles.roomModalHeader }>
            
            <Typography variant="h6" 
            sx={styles.headerContent }>
              
              Create Room
              </Typography>
            <IconButton onClick={() => setOpenRoomModal(false)} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Box sx={{ p: 3, width:"844px",height:"275.52px",top:"237px",left:"298px",gap:"32px" }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>Room Name</Typography>
              <TextField 
                fullWidth 
                variant="outlined"
                placeholder="Type"
                size="small"
                sx={{ mb: 3 }}
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                required
              />
            </Box>
              
            {/* Amenities and capacity box */}
            {/* <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr',
              gap: "40px", 
              mb: 2,
              width: "413px",
              height: "62px"
            }}>
              <Box sx={{width:"173px",height:"62px"}}>
                <Typography variant="body2" sx={{ mb: 1 }}>Amenities</Typography>
                <Select
                  sx={{width: "173px",height: "40px",borderRadius: "4px", border: "1px", padding: "12px", gap: "10px", backgroundColor: "#FFFFFF"}}
                  displayEmpty
                  variant="outlined"
                  value={amenities}
                  onChange={(e) => setAmenities(e.target.value)}
                  renderValue={(selected) => selected ? selected : "Monitor and..."}
                  size="small"
                >
                  <MenuItem value="Projector">Projector</MenuItem>
                  <MenuItem value="Whiteboard">Whiteboard</MenuItem>
                  <MenuItem value="Monitor">Monitor</MenuItem>
                  <MenuItem value="Monitor and Projector">Monitor and Projector</MenuItem>
                  <MenuItem value="Monitor and Whiteboard">Monitor and Whiteboard</MenuItem>
                </Select>
              </Box>

              <Box sx={{ width: "200px", height: "62px", left: "213px", gap: "6px" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography variant="body2" sx={{ lineHeight: "15.73px", mr: 1 }}>Capacity</Typography>
                  <PeopleIcon fontSize="small" />
                </Box>
                <TextField
                  sx={{ height: "40px", width: "200px", borderRadius: "4px", border: "1px", gap: "10px" }}
                  variant="outlined"
                  placeholder="1234"
                  size="small"
                  value={capacity}
                  onChange={(e) => handleNumberInput(e, setCapacity, 9999)}
                  inputProps={{ 
                    maxLength: 4,
                    inputMode: 'numeric'
                  }}
                />
              </Box>
            </Box>
              
            <Box sx={{ 
              display: 'flex', 
              gridTemplateColumns: '1fr 1fr',
              gap: 2, 
              mb: 2,
              width: "746px",
              height:"52px",
              gap: "22px"
            }}>
              <Box sx={{ width:"170px",height:"52px",gap:"16px"}}>
                <Typography variant="body2" sx={{ mb: 1, width:"170px", height:"16px",lineHeight:"15.73px" }}>Is Available</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', width: "64px",height: "20px",gap: "10px" }}>
                  <Switch 
                    checked={isAvailable}
                    onChange={(e) => setIsAvailable(e.target.checked)}
                  />
                  <Typography variant="body2" color="text.secondary">{isAvailable ? 'Yes' : 'No'}</Typography>
                </Box>
              </Box>
                
              <Box sx={{width: "170px",height: "52px", gap: "16px"}}>
                <Typography variant="body2" sx={{ mb: 1, width: "170px",height:"16px",lineHeight: "15.73px" }}>Is Available for Booking</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', width:"64px",height: "20px", gap:"10px" }}>
                  <Switch 
                    checked={isAvailableForBooking}
                    onChange={(e) => setIsAvailableForBooking(e.target.checked)}
                  />
                  <Typography variant="body2" color="text.secondary">{isAvailableForBooking ? 'Yes' : 'No'}</Typography>
                </Box>
              </Box>
                
              <Box sx={{width:"170px", widht:"52px", gap: "16px"}}>
                <Typography variant="body2" sx={{ mb: 1, width: "170px", height: "16px", lineHeight:"15.73px"}}>Approval</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', width:"64px", height: "20px",gap: "10px" }}>
                  <Switch 
                    checked={requiresApproval}
                    onChange={(e) => setRequiresApproval(e.target.checked)}
                  />
                  <Typography variant="body2" color="text.secondary">{requiresApproval ? 'Yes' : 'No'}</Typography>
                </Box>
              </Box>
                
              <Box sx={{width:"170px",height: "52px",gap:"16px"}}>
                <Typography variant="body2" sx={{ mb: 1,width:"170px",height:"16px", lineHeight: "15.73px" }}>Allow Recurrence</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', width:"64px",height:"20px", gap:"10px"}}>
                  <Switch 
                    checked={allowRecurrence}
                    onChange={(e) => setAllowRecurrence(e.target.checked)}
                  />
                  <Typography variant="body2" color="text.secondary">{allowRecurrence ? 'Yes' : 'No'}</Typography>
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              mt: 3,
              gap: 2
            }}>
              <Button 
                // onClick={() => {
                //   resetRoomForm();
                //   setOpenRoomModal(false);
                // }}
                sx={{ 
                  color: 'text.primary', 
                  textTransform: 'none',
                  px: 3
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                onClick={handleCreateRoom}
                sx={{ 
                  bgcolor: '#3182CE', 
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: '#2B6CB0',
                  },
                  px: 3
                }}
              >
                Create
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>  */}

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Drawer>
  );
};

export default Sidebar;


// this code will work well
// import React, { useState, useEffect } from 'react';
// import { Drawer, ListItem, ListItemIcon, ListItemText, Box, Typography, Modal, Button, TextField, Select, MenuItem, FormControlLabel, Switch, IconButton } from '@mui/material';
// import EmailIcon from '@mui/icons-material/Email';
// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import HelpIcon from '@mui/icons-material/Help';
// import SettingsIcon from '@mui/icons-material/Settings';
// import AddLocationIcon from '@mui/icons-material/AddLocation';
// import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
// import CloseIcon from '@mui/icons-material/Close';
// import indium from "../assets/indium.png";
// import styles from './SidebarStyles';
// import PeopleIcon from '@mui/icons-material/People';
// import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/material/Alert';
// import AssessmentIcon from '@mui/icons-material/Assessment';
// import { useNavigate } from 'react-router-dom';
// const Sidebar = ({ userRole }) => {
//   const navigate = useNavigate();
//   const [openLocationModal, setOpenLocationModal] = useState(false);
//   const [openRoomModal, setOpenRoomModal] = useState(false);
//   const role = userRole || "";
//   const isSuperAdmin = role === "SuperAdmin" || role === "SuperAdmin";
//   const isAdmin = userRole === "Admin" || userRole === "SuperAdmin";
//   const [rooms, setRooms] = useState([]);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success'
//   });

  
  
//   const [locations, setLocations] = useState([]); // Store created locations
//   const [locationName, setLocationName] = useState("");
//   const [shortName, setShortName] = useState("");
//   const [bookingWindow, setBookingWindow] = useState(60);
//   const [noticeDuration, setNoticeDuration] = useState(15);
//   const [recurrenceCount, setRecurrenceCount] = useState(15);
//   const [adminUser, setAdminUser] = useState("");
//   const [isActive, setIsActive] = useState(false);

//   const handleCreateLocation = () => {
//     const newLocation = {
//       locationName,
//       shortName,
//       bookingWindow,
//       noticeDuration,
//       recurrenceCount,
//       adminUser,
//       isActive,
//     };
//   // Simulate an API call to save the location
//   setTimeout(() => {
//     console.log("Fake API call: Location saved to server");
//     setSnackbar({
//     open: true,
//     message: 'Location created successfully!',
//     severity: 'success'
//     });
//   }, 1000);
//     setLocations((prev) => [...prev, newLocation]); // Save to frontend state
//     console.log("Created Location:", newLocation); // Log the created location
//     setOpenLocationModal(false); // Close the modal
//   };
  
  
//   const [roomName, setRoomName] = useState('');
//   const [amenities, setAmenities] = useState('');
//   const [capacity, setCapacity] = useState('');
//   const [isAvailable, setIsAvailable] = useState(false);
//   const [isAvailableForBooking, setIsAvailableForBooking] = useState(false);
//   const [requiresApproval, setRequiresApproval] = useState(false);
//   const [allowRecurrence, setAllowRecurrence] = useState(false);

//   const handleCreateRoom = () => {
//     const newRoom = {
//       roomName,
//       amenities,
//       capacity,
//       isAvailable,
//       isAvailableForBooking,
//       requiresApproval,
//       allowRecurrence,
//     };
  
//     console.log("Sending request to create room...");
  
//     setTimeout(() => {
//       console.log("Fake API Response: Room created successfully!", newRoom);
  
//       const fakeResponse = { id: Date.now(), ...newRoom };
  
//       setRooms((prev) => [...prev, fakeResponse]); // Save to frontend state
  
//       setSnackbar({
//         open: true,
//         message: "Room created successfully!",
//         severity: "success",
//       });
  
//       setOpenRoomModal(false); // Close the modal
//     }, 1000); // Simulate a 1-second network delay
//   };

//   const handleNumberInput = (setter) => (event) => {
//     const value = event.target.value;
//     if (!isNaN(value) && value !== "") {
//       setter(Number(value)); // Convert input to a number
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar({ open: false, message: "", severity: "success" });
//   };
    
//   return (
//     <Drawer variant="permanent" sx={styles.drawer}>
//       <Box sx={styles.mainContainer}>
//         <Box sx={styles.logoContainer}>
//           <Box sx={styles.innerLogoContainer}></Box>
//         </Box>
//         <Box component="img" src={indium} alt="Indium" sx={styles.image} />
//       </Box>
//       <Box sx={styles.sectionContainer}>
//         <Typography sx={styles.generalText}>General</Typography>
//         <Box sx={styles.bookMeetingAdminContainer}>
//           <ListItem button sx={styles.bookMeetingButton}>
//             <ListItemIcon sx={styles.listItemIcon}>
//               <EmailIcon />
//             </ListItemIcon>
//             <ListItemText primary="Book Meeting" sx={styles.menuText} />
//           </ListItem>
//           <ListItem button sx={styles.adminButton} onClick={() => navigate('/admin/reports')}>
//             <ListItemIcon sx={styles.listItemIcon}>
//             <AssessmentIcon />
//               {/* <AdminPanelSettingsIcon /> */}
//             </ListItemIcon>
            
//             <ListItemText primary="Reports" sx={styles.menuText} onClick={() => window.location.href = '/admin/reports'} />
//             {/* <ListItemText primary="Reports" sx={styles.menuText} /> */}
//           </ListItem>
//         </Box>
//         <Box sx={styles.adminShowButtons}>
//           {isAdmin && (
//             <>
//             {isSuperAdmin && (
//               <ListItem button sx={styles.createLocationButton} onClick={() => setOpenLocationModal(true)}>
//                 <ListItemIcon sx={styles.listItemIcon}>
//                   <AddLocationIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Create New Location" sx={styles.menuText} />
//               </ListItem>
//               )}
//               <ListItem button sx={styles.createRoomButton} onClick={() => setOpenRoomModal(true)}>
//                 <ListItemIcon sx={styles.listItemIcon}>
//                   <MeetingRoomIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Create Room" sx={styles.menuText} />
//               </ListItem>
//             </>
//           )}
//         </Box>
//         <Box sx={styles.helpSettingsContainer}>
//           <Box sx={styles.helpSettingsBox}>
//             <ListItem button sx={styles.helpButton}>
//               <ListItemIcon sx={styles.listItemIcon}>
//                 <HelpIcon />
//               </ListItemIcon>
//               <ListItemText primary="Help & Center" sx={styles.menuText} />
//             </ListItem>
//             <ListItem button sx={styles.settingsButton}>
//               <ListItemIcon sx={styles.listItemIcon}>
//                 <SettingsIcon />
//               </ListItemIcon>
//               <ListItemText primary="Settings" sx={styles.menuText} />
//             </ListItem>
//           </Box>
//         </Box>
//       </Box>

//       {/* Create Location Modal with all fields */}
//       <Modal open={openLocationModal} onClose={() => setOpenLocationModal(false)}>
//         {/* Modalcontainer */}
//         <Box sx={styles.modalContainer
//           // position: 'absolute',
//           // top: '50%',
//           // left: '50%',
//           // transform: 'translate(-50%, -50%)',
//           // //width: 500,
//           // bgcolor: 'background.paper',
//           // borderRadius: 1,
//           // boxShadow: 24,
//           // p: 0,
//           // outline: 'none',
//           // height:"450px" 
//         }>
//           {/* modalHeader */}
//           <Box sx={styles.modalHeader
//             // display: 'flex',
//             // justifyContent: 'space-between',
//             // alignItems: 'center',
//             // bgcolor: '#1A202C',
//             // color: 'white',
//             // p: 2,
//             // borderTopLeftRadius: 4,
//             // borderTopRightRadius: 4,
//             // width:"556px",
//           }>
//             <Typography variant="h6">Create Location</Typography>
//             <IconButton onClick={() => setOpenLocationModal(false)} sx={{ color: 'white' }}>
//               <CloseIcon />
//             </IconButton>
//           </Box>

//         {/* modalbody */}
//           <Box sx={ styles.modalBody
//             // p: 3,
//             // width:"540px", 
//             // backgroundColor:"white"
//             }>
//             <Box sx={{ mb: 2}}>
//                {/* nameandshortbox */}
//               <Box sx={styles.nameandShortNameBox
//                 // display:"flex", 
//                 // gap:"12px"
//                 }>
//                   {/*namebox */}
//               <Box sx={styles.nameBox
//                 // width:"200px",height:"62px",top:"237px",left:"298px"
//                 }>
//               <Typography variant="body2" sx={styles.nameText
//                 // mb: 1, widht: "200px", height: "16px" 
//                 }>
//                 Location Name</Typography>
//               <TextField 
//                 fullWidth 
//                 variant="outlined"
//                 placeholder="Type"
//                 size="small"
//                 sx={styles.nameTextField
//                   // mb: 2,width:"200px",height:"40px",borderRadius:"4px",padding: "12px", gap: "10px"
//                 }
//               />
//               </Box>
//               <Box sx={styles.shortNameBox
//                 // width:"246px", height:"62px",top:"237px",left:"524px"
//                 }>
//               <Typography variant="body2" sx={styles.shortNameText
//                 // mb: 1, widht: "246px",height:"16px", lineHeight:"15.73px"
//                 }>
//                 Short name ( Olympia Tech Park - OTP )</Typography>
//               <TextField 
//                 fullWidth 
//                 variant="outlined"
//                 placeholder="Type"
//                 size="small"
//                 sx={styles.shortNameTextField
//                   //  mb: 2, width:"246px",height:"40px",borderRadius:"4px",padding:"12px",gap:"10px" 
//                   }
//               />
//               </Box>
//               </Box>

//               {/* <Box sx={{width:"170px",height:"62px",top:"336px",left:"298px", gap:"6px"}}>
//               <Typography variant="body2" sx={{ mb: 1,width:"170px",height:"16px`",lineHeight:"15.73px" }}>Admin Users</Typography>
//               <Select
//                 fullWidth
//                 displayEmpty
//                 variant="outlined"
//                 renderValue={(selected) => selected ? selected : "Select"}
//                 size="small"
//                 sx={{ mb: 2, widht:"170px", height:"40px",borderRadius:"4px",padding:"12px",gap:"10px" }}
//               >
//                 <MenuItem value="" disabled>Select</MenuItem>
//                 <MenuItem value={1}>User 1</MenuItem>
//                 <MenuItem value={2}>User 2</MenuItem>
//                 <MenuItem value={3}>User 3</MenuItem>
//               </Select>
//               </Box> */}
              
//               {/* Added fields in a more compact layout */}
//               <Box sx={styles.timeBox
//                 // display: 'flex', 
//                 // gridTemplateColumns: '1fr 1fr',
//                 // gap: 2,
//                 // mb: 2
//               }>
//                 <Box sx={styles.bookingWindowBox
//                   // width:"170px", height:"62px",top:"336px",left:"298px", gap:"6px"
//                   }>
//                   <Typography variant="body2" sx={styles.bookingText
//                     // mb: 1, width:"170px",height:"16px",size:"13px",lineHeight:"15.73px",  marginTop:"30px" 
//                     }>
//                     Booking Allowed Window In Days (Max: 60)</Typography>
//                   <TextField 
//                     fullWidth 
//                     variant="outlined"
//                     placeholder="60"
//                     size="small"
//                     sx={styles.bookingTextField
//                       // width:"170px", height:"40px",borderRadius:"4px",padding:"12px",gap:"10px"
//                     }
//                     value={bookingWindow}
//                     onChange={(e) => handleNumberInput(e, setBookingWindow, 60)}
//                     inputProps={{ 
//                       maxLength: 2,
//                       inputMode: 'numeric',
                      
//                     }}
//                     helperText={parseInt(bookingWindow) > 60 ? "Value should not exceed 60" : ""}
//                     error={parseInt(bookingWindow) > 60}
//                   />
//                 </Box>
                
//                 <Box sx={styles.durationBox
//                   // width:"170px", height:"62px",top:"400px"
//                   }>
//                   <Typography variant="body2" sx={styles.durationText
//                     // mb: 1, width:"170px",height:"16px",size:"13px",lineHeight:"15.73px", marginTop:"30px"
//                      }>
//                     Notice Duration To Book In Min (Max: 15)</Typography>
//                   <TextField 
//                     fullWidth 
//                     variant="outlined"
//                     placeholder="15"
//                     size="small"
//                     sx={styles.durationTextField
//                       // width:"170px",height:"40px",borderRadius:"4px",padding:"12px"
//                     }
//                     value={noticeDuration}
//                     onChange={(e) => handleNumberInput(e, setNoticeDuration, 60)}
//                     inputProps={{ 
//                       maxLength: 2,
//                       inputMode: 'numeric'
//                     }}
//                     helperText={parseInt(noticeDuration) > 15 ? "Value should not exceed 60" : ""}
//                     error={parseInt(noticeDuration) > 15}
//                   />
//                 </Box>
//                 <Box sx={styles.recurrenceBox
//                   // width:"170px",height:"62px",top:"336px",left:"298px"
//                   }>
//                   <Typography variant="body2" sx={ styles.recurrenceText
//                     // mb: 1,width:"170px",height:"16px",size:"13px",lineHeight:"15.73px", marginTop:"30px" 
//                     }>
//                     Recurrence Count Allowed (Max: 20)</Typography>
//                   <TextField 
//                     fullWidth 
//                     variant="outlined"
//                     placeholder="15"
//                     size="small"
//                     sx={styles.recurrenceTextField
//                       // width:"170px",height:"40px",borderRadius:"4px",padding:"12px",
//                     }
//                     value={recurrenceCount}
//                     onChange={(e) => handleNumberInput(e, setRecurrenceCount, 20)}
//                     inputProps={{ 
//                       maxLength: 2,
//                       inputMode: 'numeric'
//                     }}
//                     helperText={parseInt(recurrenceCount) > 15 ? "Value should not exceed 20" : ""}
//                     error={parseInt(recurrenceCount) > 15}
//                   />
//                 </Box>
//               </Box>
              
              
//               {/* <Box sx={{ 
//                 display: 'grid', 
//                 gridTemplateColumns: '1fr 1fr',
//                 gap: 2
//               }}> */}
//                 {/* <Box sx={{width:"170px",height:"62px",top:"336px",left:"298px"}}>
//                   <Typography variant="body2" sx={{ mb: 1,width:"170px",height:"16px",size:"13px",lineHeight:"15.73px" }}>Recurrence Count Allowed (Max: 20)</Typography>
//                   <TextField 
//                     fullWidth 
//                     variant="outlined"
//                     placeholder="15"
//                     size="small"
//                     value={recurrenceCount}
//                     onChange={(e) => handleNumberInput(e, setRecurrenceCount, 20)}
//                     inputProps={{ 
//                       maxLength: 2,
//                       inputMode: 'numeric'
//                     }}
//                     helperText={parseInt(recurrenceCount) > 20 ? "Value should not exceed 20" : ""}
//                     error={parseInt(recurrenceCount) > 20}
//                   />
//                 </Box> */}
//                 {/* </Box>
//                 </Box> */}

//                 <Box sx={styles.adminActiveBox
//                 // display: 'flex', 
//                 // //gridTemplateColumns: '1fr 1fr',
//                 // gap: 2,
//                 // left:"298px"
               
//               }>
//               {/* <Box> */}
//               <Box sx={styles.adminUserBox
//                 // width:"170px",height:"62px",top:"336px",marginLeft:"23px", gap:"6px"
//                 }>
//               <Typography variant="body2" sx={styles.adminUserText
//                 // mb: 1,width:"170px",height:"16px`",lineHeight:"15.73px", marginTop:"30px" 
//                 }>Admin Users</Typography>
//               <Select
//                 fullWidth
//                 displayEmpty
//                 variant="outlined"
//                 renderValue={(selected) => selected ? selected : "Select"}
//                 size="small"
//                 sx={ styles.adminUserTextField
//                   // mb: 2, widht:"170px", height:"40px",borderRadius:"4px",padding:"12px",gap:"10px",
//                  }
//               >
//                 <MenuItem value="" disabled>Select</MenuItem>
//                 <MenuItem value={1}>User 1</MenuItem>
//                 <MenuItem value={2}>User 2</MenuItem>
//                 <MenuItem value={3}>User 3</MenuItem>
//               </Select>
//               </Box>

//                 <Box sx={styles.activeBox
//                   // width:"170px",height:"52px",top:"346px",left:"524px",gap:"16px"
//                   } >
//                   <Typography variant="body2" sx={styles.activeText 
//                     // mb: 1,width:"170px",height:"16px",lineHeight:"15.73px",marginTop:"30px",size:"13px" 
//                     }>Is Active</Typography>
//                   <Box sx={ styles.activeToggle
//                     // display: 'flex', alignItems: 'center',width:"64px",height:"20px",gap:"10px" 
//                     }>
//                     <Switch />
//                     <Typography variant="body2" color="text.secondary" sx={ styles.noText
//                       // ml: 1,width:"18px",height:"18px",lineHeight:"18px",size:"13px" 

//                     }>No</Typography>
//                   </Box>
//                 </Box>
//                 {/* </Box>   */}
//                 </Box>
                 
//                 </Box>
//                 </Box>
            
//             <Box sx={styles.cancelCreateBox
//               // display: 'flex', 
//               // width:"237px",
//               // height:"41px",
//               // marginLeft:"330px",
//               // mt: 3,
//               // gap: "23px",
//               // marginTop:"40px"
//             }>
//               <Box sx={styles.cancelBox}>
//               <Button 
//                 onClick={() => setOpenLocationModal(false)}
//                 sx={styles.cancelButton
//                   // color: 'text.primary', 
//                   // textTransform: 'none',
//                   // px: 3
//                 }
//               >
//                 Cancel
//               </Button>
//               </Box>
//               <Box sx={styles.crearteBox}>
//               <Button 
//                 variant="contained" 
//                 onClick={handleCreateLocation}
//                 sx={styles.createButton
//                   // bgcolor: '#3182CE', 
//                   // textTransform: 'none',
//                   // '&:hover': {
//                   //   bgcolor: '#2B6CB0',
//                   // },
//                   // px: 3
//                 }
//               >
//                 Create
//               </Button>
//               </Box>
//             </Box>
//         </Box>
//       </Modal>

//       {/* Create Room Modal (Updated with form handling) */}
//       <Modal open={openRoomModal} onClose={() => setOpenRoomModal(false)}>
//         <Box sx={{
//           position: 'absolute',
//           top: "244px",
//           left: "600px",
//           transform: 'translate(-50%, -50%)',
//           width: "930px",
//           height: "489px",
//           bgcolor: 'background.paper',
//           borderRadius: 1,
//           boxShadow: 24,
//           p: 0,
//           outline: 'none',
//         }}>
//           <Box sx={styles.roomModalHeader
//             // display: 'flex',
//             // justifyContent: 'space-between',
//             // alignItems: 'center',
//             // bgcolor: '#1A202C',
//             // color: 'white',
//             // width:"900px",
//             // height:"44px",
//             // p: 2,
//             // borderTopLeftRadius: 4,
//             // borderTopRightRadius: 4,
//           }>
//             <Typography variant="h6" 
//             sx={styles.headerContent
//               // height:"24px",
//               // top:"168px", 
//               // left:"255px",
//               }>
//               Create Room
//               </Typography>
//             <IconButton onClick={() => setOpenRoomModal(false)} sx={{ color: 'white' }}>
//               <CloseIcon />
//             </IconButton>
//           </Box>
          
//           <Box sx={{ p: 3, width:"844px",height:"275.52px",top:"237px",left:"298px",gap:"32px" }}>
//             <Box sx={{ mb: 2 }}>
//               <Typography variant="body2" sx={{ mb: 1 }}>Room Name</Typography>
//               <TextField 
//                 fullWidth 
//                 variant="outlined"
//                 placeholder="Type"
//                 size="small"
//                 sx={{ mb: 3 }}
//                 value={roomName}
//                 onChange={(e) => setRoomName(e.target.value)}
//                 required
//               />
//             </Box>
              
//             {/* Amenities and capacity box */}
//             <Box sx={{ 
//               display: 'grid', 
//               gridTemplateColumns: '1fr 1fr',
//               gap: "40px", 
//               mb: 2,
//               width: "413px",
//               height: "62px"
//             }}>
//               <Box sx={{width:"173px",height:"62px"}}>
//                 <Typography variant="body2" sx={{ mb: 1 }}>Amenities</Typography>
//                 <Select
//                   sx={{width: "173px",height: "40px",borderRadius: "4px", border: "1px", padding: "12px", gap: "10px", backgroundColor: "#FFFFFF"}}
//                   displayEmpty
//                   variant="outlined"
//                   value={amenities}
//                   onChange={(e) => setAmenities(e.target.value)}
//                   renderValue={(selected) => selected ? selected : "Monitor and..."}
//                   size="small"
//                 >
//                   <MenuItem value="Projector">Projector</MenuItem>
//                   <MenuItem value="Whiteboard">Whiteboard</MenuItem>
//                   <MenuItem value="Monitor">Monitor</MenuItem>
//                   <MenuItem value="Monitor and Projector">Monitor and Projector</MenuItem>
//                   <MenuItem value="Monitor and Whiteboard">Monitor and Whiteboard</MenuItem>
//                 </Select>
//               </Box>

//               <Box sx={{ width: "200px", height: "62px", left: "213px", gap: "6px" }}>
//                 <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                   <Typography variant="body2" sx={{ lineHeight: "15.73px", mr: 1 }}>Capacity</Typography>
//                   <PeopleIcon fontSize="small" />
//                 </Box>
//                 <TextField
//                   sx={{ height: "40px", width: "200px", borderRadius: "4px", border: "1px", gap: "10px" }}
//                   variant="outlined"
//                   placeholder="1234"
//                   size="small"
//                   value={capacity}
//                   onChange={(e) => handleNumberInput(e, setCapacity, 9999)}
//                   inputProps={{ 
//                     maxLength: 4,
//                     inputMode: 'numeric'
//                   }}
//                 />
//               </Box>
//             </Box>
              
//             <Box sx={{ 
//               display: 'flex', 
//               gridTemplateColumns: '1fr 1fr',
//               gap: 2, 
//               mb: 2,
//               width: "746px",
//               height:"52px",
//               gap: "22px"
//             }}>
//               <Box sx={{ width:"170px",height:"52px",gap:"16px"}}>
//                 <Typography variant="body2" sx={{ mb: 1, width:"170px", height:"16px",lineHeight:"15.73px" }}>Is Available</Typography>
//                 <Box sx={{ display: 'flex', alignItems: 'center', width: "64px",height: "20px",gap: "10px" }}>
//                   <Switch 
//                     checked={isAvailable}
//                     onChange={(e) => setIsAvailable(e.target.checked)}
//                   />
//                   <Typography variant="body2" color="text.secondary">{isAvailable ? 'Yes' : 'No'}</Typography>
//                 </Box>
//               </Box>
                
//               <Box sx={{width: "170px",height: "52px", gap: "16px"}}>
//                 <Typography variant="body2" sx={{ mb: 1, width: "170px",height:"16px",lineHeight: "15.73px" }}>Is Available for Booking</Typography>
//                 <Box sx={{ display: 'flex', alignItems: 'center', width:"64px",height: "20px", gap:"10px" }}>
//                   <Switch 
//                     checked={isAvailableForBooking}
//                     onChange={(e) => setIsAvailableForBooking(e.target.checked)}
//                   />
//                   <Typography variant="body2" color="text.secondary">{isAvailableForBooking ? 'Yes' : 'No'}</Typography>
//                 </Box>
//               </Box>
                
//               <Box sx={{width:"170px", widht:"52px", gap: "16px"}}>
//                 <Typography variant="body2" sx={{ mb: 1, width: "170px", height: "16px", lineHeight:"15.73px"}}>Approval</Typography>
//                 <Box sx={{ display: 'flex', alignItems: 'center', width:"64px", height: "20px",gap: "10px" }}>
//                   <Switch 
//                     checked={requiresApproval}
//                     onChange={(e) => setRequiresApproval(e.target.checked)}
//                   />
//                   <Typography variant="body2" color="text.secondary">{requiresApproval ? 'Yes' : 'No'}</Typography>
//                 </Box>
//               </Box>
                
//               <Box sx={{width:"170px",height: "52px",gap:"16px"}}>
//                 <Typography variant="body2" sx={{ mb: 1,width:"170px",height:"16px", lineHeight: "15.73px" }}>Allow Recurrence</Typography>
//                 <Box sx={{ display: 'flex', alignItems: 'center', width:"64px",height:"20px", gap:"10px"}}>
//                   <Switch 
//                     checked={allowRecurrence}
//                     onChange={(e) => setAllowRecurrence(e.target.checked)}
//                   />
//                   <Typography variant="body2" color="text.secondary">{allowRecurrence ? 'Yes' : 'No'}</Typography>
//                 </Box>
//               </Box>
//             </Box>
            
//             <Box sx={{ 
//               display: 'flex', 
//               justifyContent: 'flex-end', 
//               mt: 3,
//               gap: 2
//             }}>
//               <Button 
//                 // onClick={() => {
//                 //   resetRoomForm();
//                 //   setOpenRoomModal(false);
//                 // }}
//                 sx={{ 
//                   color: 'text.primary', 
//                   textTransform: 'none',
//                   px: 3
//                 }}
//               >
//                 Cancel
//               </Button>
//               <Button 
//                 variant="contained" 
//                 onClick={handleCreateRoom}
//                 sx={{ 
//                   bgcolor: '#3182CE', 
//                   textTransform: 'none',
//                   '&:hover': {
//                     bgcolor: '#2B6CB0',
//                   },
//                   px: 3
//                 }}
//               >
//                 Create
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       </Modal>

//       {/* Snackbar for notifications */}
//       <Snackbar 
//         open={snackbar.open} 
//         autoHideDuration={6000} 
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//       >
//         <Alert 
//           onClose={handleCloseSnackbar} 
//           severity={snackbar.severity} 
//           sx={{ width: '100%' }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Drawer>
//   );
// };

// export default Sidebar;


