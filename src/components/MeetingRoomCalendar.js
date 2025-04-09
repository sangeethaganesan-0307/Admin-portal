// import React, { useState, useEffect } from 'react';
// import { 
//   Box, 
//   Typography, 
//   Grid, 
//   Paper, 
//   Button, 
//   AppBar, 
//   Toolbar, 
//   Switch, 
//   IconButton,
//   Chip,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Divider
// } from '@mui/material';
// import WifiIcon from '@mui/icons-material/Wifi';
// import TvIcon from '@mui/icons-material/Tv';
// import PeopleIcon from '@mui/icons-material/People';
// import VideocamIcon from '@mui/icons-material/Videocam';
// import AddIcon from '@mui/icons-material/Add';

// const MeetingRoomCalendar = () => {
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     all: true,
//     tv: false,
//     wifi: false,
//     projector: false
//   });
  
//   // Time slots from 9 AM to 5 PM
//   const timeSlots = [
//     '9 AM', '10 AM', '11 AM', '12 AM', '01 PM', '02 PM', '03 PM', '04 PM'
//   ];
  
//   // Sample meetings data - in a real app, this would be fetched from an API
//   const meetings = [
//     { id: 1, room: 'Maddison Square', title: 'Yearly Sales Meeting', start: '9 AM', end: '11 AM' },
//     { id: 2, room: 'St. Andrews', title: 'Annual Review', start: '11 AM', end: '3 PM' },
//     { id: 3, room: 'Adelaide Oval', title: 'Interview', start: '4 PM', end: '5 PM' },
//     { id: 4, room: 'Colosseum', title: 'Legal Team', start: '12 AM', end: '2 PM' },
//     { id: 5, room: "Lord's Square", title: 'Booked By Admin', start: '9 AM', end: '10 AM', note: 'Sale' }
//   ];

// //   useEffect(() => {
// //     // Fetch room data
// //     const fetchRooms = async () => {
// //       try {
// //         const response = await fetch('/api/rooms.json');
// //         const data = await response.json();
// //         setRooms(data);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error('Error fetching room data:', error);
// //         setLoading(false);
// //       }
// //     };

// //     fetchRooms();
// //   }, []);

// useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const response = await fetch("/api/rooms.json");
//         const data = await response.json();
  
//         console.log("Fetched data:", data); // Debugging output
  
//         if (Array.isArray(data)) {
//           setRooms(data); // ✅ Direct array
//         } else if (data.rooms && Array.isArray(data.rooms)) {
//           setRooms(data.rooms); // ✅ Extract array from object
//         } else {
//           console.error("Unexpected API response format:", data);
//           setRooms([]); // Prevent `.map()` errors
//         }
  
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching room data:", error);
//         setRooms([]); // Ensure `rooms` is always an array
//         setLoading(false);
//       }
//     };
  
//     fetchRooms();
//   }, []);
       

//   // Function to find meetings for a specific room and time slot
//   const findMeeting = (room, timeSlot) => {
//     return meetings.find(meeting => 
//       meeting.room === room.name && 
//       timeSlots.indexOf(meeting.start) <= timeSlots.indexOf(timeSlot) && 
//       timeSlots.indexOf(meeting.end) > timeSlots.indexOf(timeSlot)
//     );
//   };

//   // Function to determine if a meeting spans multiple time slots
//   const isMeetingStart = (room, timeSlot) => {
//     return meetings.some(meeting => 
//       meeting.room === room.name && 
//       meeting.start === timeSlot
//     );
//   };

//   // Function to calculate rowspan for a meeting
//   const getMeetingRowspan = (room, timeSlot) => {
//     const meeting = meetings.find(m => 
//       m.room === room.name && 
//       m.start === timeSlot
//     );
    
//     if (!meeting) return 1;
    
//     const startIndex = timeSlots.indexOf(meeting.start);
//     const endIndex = timeSlots.indexOf(meeting.end);
//     return endIndex - startIndex;
//   };

//   if (loading) {
//     return <Typography>Loading...</Typography>;
//   }

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       {/* Header */}
//       <AppBar position="static" color="default" elevation={0}>
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             OTP Meeting Room List
//           </Typography>
//           <Button 
//             variant="outlined" 
//             startIcon={<AddIcon />}
//             sx={{ mr: 2 }}
//           >
//             Create Room
//           </Button>
//           <FormControl sx={{ minWidth: 120, mr: 2 }}>
//             <Select
//               value="all"
//               size="small"
//               displayEmpty
//               renderValue={() => "All"}
//             >
//               <MenuItem value="all">All</MenuItem>
//               <MenuItem value="capacity">Capacity</MenuItem>
//             </Select>
//           </FormControl>
//           <Chip 
//             label="TV" 
//             onClick={() => setFilters({...filters, tv: !filters.tv})}
//             sx={{ mr: 1, bgcolor: filters.tv ? 'primary.main' : 'default' }}
//           />
//           <Chip 
//             label="WIFI" 
//             onClick={() => setFilters({...filters, wifi: !filters.wifi})}
//             sx={{ mr: 1, bgcolor: filters.wifi ? 'primary.main' : 'default' }}
//           />
//           <Chip 
//             label="Projector" 
//             onClick={() => setFilters({...filters, projector: !filters.projector})}
//             sx={{ bgcolor: filters.projector ? 'primary.main' : 'default' }}
//           />
//         </Toolbar>
//       </AppBar>

//       {/* Calendar Grid */}
//       <Paper sx={{ mt: 2, width: '100%', overflow: 'auto' }}>
//         <Grid container sx={{ minWidth: 1000 }}>
//           {/* Header row with room names */}
//           <Grid item xs={1} sx={{ borderRight: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0' }}>
//             <Box sx={{ p: 1, height: '60px', display: 'flex', alignItems: 'center' }}>
//               <Typography variant="subtitle2">TIME</Typography>
//             </Box>
//           </Grid>
          
//           {rooms.map((room, index) => (
//             <Grid item xs key={room.id} sx={{ borderRight: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0' }}>
//               <Box sx={{ 
//                 p: 1, 
//                 height: '60px', 
//                 bgcolor: index % 2 === 0 ? '#f5f9fc' : 'white',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'space-between'
//               }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <Typography variant="subtitle2">{room.name}</Typography>
//                   <Switch size="small" checked={room.available} />
//                 </Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <WifiIcon fontSize="small" color={room.wifi ? "primary" : "disabled"} />
//                   <TvIcon fontSize="small" color={room.tv ? "primary" : "disabled"} />
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <PeopleIcon fontSize="small" />
//                     <Typography variant="caption" sx={{ ml: 0.5 }}>{room.capacity}</Typography>
//                   </Box>
//                 </Box>
//               </Box>
//             </Grid>
//           ))}
          
//           {/* Time slots and meetings */}
//           {timeSlots.map((timeSlot) => (
//             <React.Fragment key={timeSlot}>
//               {/* Time column */}
//               <Grid item xs={1} sx={{ borderRight: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0' }}>
//                 <Box sx={{ p: 1, height: '60px', display: 'flex', alignItems: 'center' }}>
//                   <Typography variant="body2">{timeSlot}</Typography>
//                 </Box>
//               </Grid>
              
//               {/* Room cells for this time slot */}
//               {rooms.map((room, index) => {
//                 const meeting = findMeeting(room, timeSlot);
//                 const isStart = isMeetingStart(room, timeSlot);
//                 const rowspan = isStart ? getMeetingRowspan(room, timeSlot) : 1;
                
//                 // If this cell is covered by a meeting that started in a previous cell, don't render it
//                 if (meeting && !isStart) {
//                   return null;
//                 }
                
//                 return (
//                   <Grid item xs key={`${room.id}-${timeSlot}`} sx={{ 
//                     borderRight: '1px solid #e0e0e0', 
//                     borderBottom: '1px solid #e0e0e0'
//                   }}>
//                     {meeting ? (
//                       <Box sx={{ 
//                         p: 1, 
//                         height: `${60 * rowspan}px`, 
//                         bgcolor: '#0a3d62',
//                         color: 'white',
//                         display: 'flex',
//                         flexDirection: 'column'
//                       }}>
//                         <Typography variant="body2">{meeting.title}</Typography>
//                         {meeting.note && (
//                           <Typography variant="caption">{meeting.note}</Typography>
//                         )}
//                       </Box>
//                     ) : (
//                       <Box sx={{ 
//                         p: 1, 
//                         height: '60px', 
//                         bgcolor: index % 2 === 0 ? '#f5f9fc' : 'white' 
//                       }} />
//                     )}
//                   </Grid>
//                 );
//               })}
//             </React.Fragment>
//           ))}
//         </Grid>
//       </Paper>
//     </Box>
//   );
// };

// export default MeetingRoomCalendar;

// import React, { useState, useEffect } from 'react';
// import { 
//   Box, 
//   Typography, 
//   Grid, 
//   Paper, 
//   Button, 
//   AppBar, 
//   Toolbar, 
//   Switch, 
//   Chip,
//   Select,
//   MenuItem,
//   FormControl,
// } from '@mui/material';
// import WifiIcon from '@mui/icons-material/Wifi';
// import TvIcon from '@mui/icons-material/Tv';
// import PeopleIcon from '@mui/icons-material/People';
// import VideocamIcon from '@mui/icons-material/Videocam';
// import AddIcon from '@mui/icons-material/Add';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// const MeetingRoomCalendar = () => {
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     all: true,
//     tv: false,
//     wifi: false,
//     projector: false
//   });
  
//   // Time slots from 9 AM to 5 PM
//   const timeSlots = [
//     '9 AM', '10 AM', '11 AM', '12 AM', '01 PM', '02 PM', '03 PM', '04 PM'
//   ];
  
//   // Sample meetings data - in a real app, this would be fetched from an API
//   const meetings = [
//     { id: 1, room: 'Maddison Square', title: 'Yearly Sales Meeting', start: '9 AM', end: '11 AM' },
//     { id: 2, room: 'St. Andrews', title: 'Annual Review', start: '11 AM', end: '3 PM' },
//     { id: 3, room: 'Adelaide Oval', title: 'Interview', start: '4 PM', end: '5 PM' },
//     { id: 4, room: 'Colosseum', title: 'Legal Team', start: '12 AM', end: '2 PM' },
//     { id: 5, room: "Lord's Square", title: 'Booked By Admin', start: '9 AM', end: '10 AM', note: 'Sale' }
//   ];

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const response = await fetch("/api/rooms.json");
//         const data = await response.json();
  
//         console.log("Fetched data:", data); // Debugging output
  
//         if (Array.isArray(data)) {
//           setRooms(data); // ✅ Direct array
//         } else if (data.rooms && Array.isArray(data.rooms)) {
//           setRooms(data.rooms); // ✅ Extract array from object
//         } else {
//           console.error("Unexpected API response format:", data);
//           setRooms([]); // Prevent `.map()` errors
//         }
  
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching room data:", error);
//         setRooms([]); // Ensure `rooms` is always an array
//         setLoading(false);
//       }
//     };
  
//     fetchRooms();
//   }, []);
       
//   // Function to find meetings for a specific room and time slot
//   const findMeeting = (room, timeSlot) => {
//     return meetings.find(meeting => 
//       meeting.room === room.name && 
//       timeSlots.indexOf(meeting.start) <= timeSlots.indexOf(timeSlot) && 
//       timeSlots.indexOf(meeting.end) > timeSlots.indexOf(timeSlot)
//     );
//   };

//   // Function to determine if a meeting spans multiple time slots
//   const isMeetingStart = (room, timeSlot) => {
//     return meetings.some(meeting => 
//       meeting.room === room.name && 
//       meeting.start === timeSlot
//     );
//   };

//   // Function to calculate rowspan for a meeting
//   const getMeetingRowspan = (room, timeSlot) => {
//     const meeting = meetings.find(m => 
//       m.room === room.name && 
//       m.start === timeSlot
//     );
    
//     if (!meeting) return 1;
    
//     const startIndex = timeSlots.indexOf(meeting.start);
//     const endIndex = timeSlots.indexOf(meeting.end);
//     return endIndex - startIndex;
//   };

//   // Function to determine meeting background color based on room
//   const getMeetingColor = (room) => {
//     const colors = {
//       'Maddison Square': '#3498db', // Light blue
//       'St. Andrews': '#003366',     // Dark blue
//       'Adelaide Oval': '#003366',   // Dark blue  
//       'Colosseum': '#003366',       // Dark blue
//       "Lord's Square": '#f0f0f0'    // Light gray
//     };
    
//     return colors[room] || '#3498db';
//   };

//   if (loading) {
//     return <Typography>Loading...</Typography>;
//   }

//   return (
//     <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', height: '100vh', p: 2 }}>
//       {/* Location selector */}
//       <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
//         <Button 
//           variant="outlined" 
//           color="inherit"
//           size="small"
//           endIcon={<KeyboardArrowDownIcon />}
//           sx={{ bgcolor: 'white', borderColor: '#e0e0e0', color: 'black', '&:hover': { bgcolor: 'white', borderColor: '#c0c0c0' } }}
//         >
//           CHENNAI OTP
//         </Button>
        
//         <Button 
//           variant="outlined" 
//           color="inherit"
//           size="small"
//           endIcon={<KeyboardArrowDownIcon />}
//           sx={{ bgcolor: 'white', borderColor: '#e0e0e0', color: 'black', '&:hover': { bgcolor: 'white', borderColor: '#c0c0c0' } }}
//         >
//           19 Dec 2024
//         </Button>
        
//         <Box sx={{ flexGrow: 1 }} />
        
//         <Button 
//           variant="contained" 
//           sx={{ bgcolor: '#0078d4', '&:hover': { bgcolor: '#006abc' } }}
//         >
//           NEW BOOKING
//         </Button>
//       </Box>
    
//       {/* Header */}
//       <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//         <Typography variant="h6" sx={{ fontWeight: 500, mr: 2 }}>
//           OTP Meeting Room List
//         </Typography>
        
//         <Button 
//           variant="text" 
//           sx={{ color: '#333', fontSize: '0.85rem', textTransform: 'none', mr: 4 }}
//         >
//           Create Room
//         </Button>
        
//         <Box sx={{ flexGrow: 1, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
//           <Button 
//             variant="text" 
//             sx={{ color: '#333', fontSize: '0.85rem', minWidth: 'auto' }}
//           >
//             All
//           </Button>
          
//           <FormControl>
//             <Select
//               value="capacity"
//               size="small"
//               variant="standard"
//               displayEmpty
//               IconComponent={KeyboardArrowDownIcon}
//               sx={{ fontSize: '0.85rem', '&:before': { borderBottom: 'none' }, '&:after': { borderBottom: 'none' } }}
//               renderValue={() => "Capacity"}
//             >
//               <MenuItem value="capacity">Capacity</MenuItem>
//               <MenuItem value="availability">Availability</MenuItem>
//             </Select>
//           </FormControl>
          
//           <Button 
//             variant="text" 
//             sx={{ color: '#333', fontSize: '0.85rem', minWidth: 'auto' }}
//           >
//             TV
//           </Button>
          
//           <Button 
//             variant="text" 
//             sx={{ color: '#333', fontSize: '0.85rem', minWidth: 'auto' }}
//           >
//             WIFI
//           </Button>
          
//           <Button 
//             variant="text" 
//             sx={{ color: '#333', fontSize: '0.85rem', minWidth: 'auto' }}
//           >
//             Projector
//           </Button>
//         </Box>
//       </Box>

//       {/* Calendar Grid */}
//       <Paper sx={{ 
//         width: '100%', 
//         overflow: 'auto',
//         borderRadius: 1,
//         boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
//       }}>
//         <Grid container sx={{ minWidth: 1000 }}>
//           {/* Header row with room names */}
//           <Grid item xs={1} sx={{ 
//             borderRight: '1px solid #e0e0e0', 
//             borderBottom: '1px solid #e0e0e0',
//             bgcolor: '#f0fbff'
//           }}>
//             <Box sx={{ p: 1.5, height: '50px', display: 'flex', alignItems: 'center' }}>
//               <Typography variant="subtitle2" sx={{ color: '#555' }}>TIME</Typography>
//             </Box>
//           </Grid>
          
//           {rooms.map((room, index) => (
//             <Grid item xs key={room.id} sx={{ 
//               borderRight: '1px solid #e0e0e0', 
//               borderBottom: '1px solid #e0e0e0',
//               bgcolor: '#f0fbff'
//             }}>
//               <Box sx={{ 
//                 p: 1.5, 
//                 height: '50px',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'space-between'
//               }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <Typography variant="subtitle2" sx={{ fontWeight: 500, color: '#555' }}>{room.name}</Typography>
//                   <Switch size="small" checked={room.available} />
//                 </Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
//                   <Box sx={{ 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     bgcolor: '#e6f2ff', 
//                     borderRadius: '4px',
//                     p: '2px 4px',
//                   }}>
//                     <TvIcon fontSize="small" sx={{ fontSize: '16px', color: room.tv ? "#0078d4" : "#aaa" }} />
//                   </Box>
//                   <Box sx={{ 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     bgcolor: '#e6f2ff', 
//                     borderRadius: '4px',
//                     p: '2px 4px',
//                   }}>
//                     <WifiIcon fontSize="small" sx={{ fontSize: '16px', color: room.wifi ? "#0078d4" : "#aaa" }} />
//                   </Box>
//                   <Box sx={{ 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     bgcolor: '#e6f2ff', 
//                     borderRadius: '4px',
//                     p: '2px 4px',
//                   }}>
//                     <PeopleIcon fontSize="small" sx={{ fontSize: '16px', color: "#0078d4" }} />
//                     <Typography variant="caption" sx={{ ml: 0.5, fontSize: '11px', fontWeight: 500 }}>{room.capacity}</Typography>
//                   </Box>
//                 </Box>
//               </Box>
//             </Grid>
//           ))}
          
//           {/* Time slots and meetings */}
//           {timeSlots.map((timeSlot) => (
//             <React.Fragment key={timeSlot}>
//               {/* Time column */}
//               <Grid item xs={1} sx={{ borderRight: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0' }}>
//                 <Box sx={{ p: 1.5, height: '60px', display: 'flex', alignItems: 'center' }}>
//                   <Typography variant="body2" sx={{ color: '#555', fontSize: '0.85rem' }}>{timeSlot}</Typography>
//                 </Box>
//               </Grid>
              
//               {/* Room cells for this time slot */}
//               {rooms.map((room, index) => {
//                 const meeting = findMeeting(room, timeSlot);
//                 const isStart = isMeetingStart(room, timeSlot);
//                 const rowspan = isStart ? getMeetingRowspan(room, timeSlot) : 1;
                
//                 // If this cell is covered by a meeting that started in a previous cell, don't render it
//                 if (meeting && !isStart) {
//                   return null;
//                 }
                
//                 return (
//                   <Grid item xs key={`${room.id}-${timeSlot}`} sx={{ 
//                     borderRight: '1px solid #e0e0e0', 
//                     borderBottom: '1px solid #e0e0e0'
//                   }}>
//                     {meeting ? (
//                       <Box sx={{ 
//                         p: 1.5, 
//                         height: `${60 * rowspan}px`, 
//                         bgcolor: getMeetingColor(room.name),
//                         color: 'white',
//                         display: 'flex',
//                         flexDirection: 'column',
//                         borderLeft: room.name === "Lord's Square" ? '4px solid #0078d4' : 'none'
//                       }}>
//                         <Typography variant="body2" sx={{ fontWeight: room.name === "Lord's Square" ? 400 : 500, color: room.name === "Lord's Square" ? '#333' : 'white' }}>
//                           {meeting.title}
//                         </Typography>
//                         {meeting.note && (
//                           <Typography variant="caption" sx={{ color: room.name === "Lord's Square" ? '#666' : 'rgba(255,255,255,0.8)' }}>
//                             {meeting.note}
//                           </Typography>
//                         )}
//                       </Box>
//                     ) : (
//                       <Box sx={{ 
//                         p: 1.5, 
//                         height: '60px',
//                         bgcolor: 'white'
//                       }} />
//                     )}
//                   </Grid>
//                 );
//               })}
//             </React.Fragment>
//           ))}
//         </Grid>
//       </Paper>
      
//       {/* Bottom indicator line */}
//       <Box sx={{ mt: 1, display: 'flex', width: '100%' }}>
//         <Box sx={{ flexGrow: 1, height: '4px', bgcolor: '#e0e0e0' }} />
//         <Box sx={{ width: '5%', height: '4px', bgcolor: '#333' }} />
//         <Box sx={{ flexGrow: 1, height: '4px', bgcolor: '#e0e0e0' }} />
//       </Box>
//     </Box>
//   );
// };

// export default MeetingRoomCalendar;

// import React, { useState, useEffect } from 'react';
// import { 
//   Paper, 
//   Grid, 
//   Typography, 
//   Button, 
//   Dialog, 
//   DialogTitle, 
//   DialogContent, 
//   DialogActions, 
//   TextField, 
//   Select, 
//   MenuItem, 
//   FormControl, 
//   InputLabel, 
//   Box, 
//   Chip, 
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Tooltip,
//   AppBar,
//   Toolbar,
//   FormHelperText
// } from '@mui/material';
// import { 
//   DatePicker, 
//   LocalizationProvider 
// } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { 
//   Add as AddIcon, 
//   Close as CloseIcon, 
//   People as PeopleIcon, 
//   Wifi as WifiIcon, 
//   Tv as TvIcon, 
//   VideoCall as VideoCallIcon,
//   Delete as DeleteIcon
// } from '@mui/icons-material';
// import { format, addDays, isSameDay, isAfter, startOfDay } from 'date-fns';

// // Helper function to generate time slots
// const generateTimeSlots = () => {
//   const slots = [];
//   for (let hour = 9; hour <= 19; hour++) {
//     const hourStr = hour > 12 ? `${hour-12}` : `${hour}`;
//     const period = hour >= 12 ? 'PM' : 'AM';
//     slots.push(`${hourStr} ${period}`);
//     slots.push(`${hourStr}:30 ${period}`);
//   }
//   return slots;
// };

// const timeSlots = generateTimeSlots();

// // Sample room data
// const locationRooms = {
//   ChennaiOTP: {
//     rooms: [
//       {
//         id: "maddison-square",
//         name: "Maddison Square",
//         capacity: 20,
//         facilities: ["tv", "wifi", "projector"],
//         location: "ChennaiOTP"
//       },
//       {
//         id: "st-andrews",
//         name: "ST. Andrews",
//         capacity: 12,
//         facilities: ["wifi", "projector"],
//         location: "ChennaiOTP"
//       },
//       {
//         id: "adelaide-oval",
//         name: "Adelaide Oval",
//         capacity: 8,
//         facilities: ["tv", "wifi"],
//         location: "ChennaiOTP"
//       }
//     ]
//   },
//   GC: {
//     rooms: [
//       {
//         id: "eden-gardens",
//         name: "Eden Gardens",
//         capacity: 16,
//         facilities: ["tv", "wifi", "projector"],
//         location: "GC"
//       },
//       {
//         id: "wankhede",
//         name: "Wankhede",
//         capacity: 10,
//         facilities: ["tv", "wifi"],
//         location: "GC"
//       }
//     ]
//   },
//   Bangalore: {
//     rooms: [
//       {
//         id: "chinnaswamy",
//         name: "Chinnaswamy",
//         capacity: 24,
//         facilities: ["tv", "wifi", "projector"],
//         location: "Bangalore"
//       },
//       {
//         id: "kanteerava",
//         name: "Kanteerava",
//         capacity: 18,
//         facilities: ["tv", "wifi", "projector"],
//         location: "Bangalore"
//       }
//     ]
//   }
// };

// // Initialize bookings data
// const initialBookings = {
//   "2025-03-18": {
//     "maddison-square-9 AM": {
//       title: "Yearly Sales Meeting",
//       description: "Annual sales review and planning",
//       duration: "2h",
//       status: "active"
//     },
//     "st-andrews-12 PM": {
//       title: "Annual Review",
//       description: "Department annual review",
//       duration: "2h",
//       status: "active"
//     }
//   },
//   "2025-03-19": {
//     "adelaide-oval-2 PM": {
//       title: "Team Huddle",
//       description: "Weekly team sync up",
//       duration: "1h",
//       status: "active"
//     }
//   }
// };

// // Component for the Meeting Room Booking Calendar
// const MeetingRoomCalendar = () => {
//   const today = new Date();
//   const formattedToday = format(today, 'yyyy-MM-dd');
  
//   // State variables
//   const [selectedLocation, setSelectedLocation] = useState("ChennaiOTP");
//   const [selectedDate, setSelectedDate] = useState(today);
//   const [selectedDateStr, setSelectedDateStr] = useState(formattedToday);
//   const [rooms, setRooms] = useState([]);
//   const [bookings, setBookings] = useState({});
//   const [openBookingDialog, setOpenBookingDialog] = useState(false);
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [bookingForm, setBookingForm] = useState({
//     title: '',
//     description: '',
//     duration: '30m',
//     roomId: '',
//     time: ''
//   });

//   // Initialize data
//   useEffect(() => {
//     // In a real app, this would fetch from API
//     setRooms(locationRooms[selectedLocation]?.rooms || []);
    
//     // Load bookings from localStorage or use initial data
//     const storedBookings = localStorage.getItem('bookings');
//     if (!storedBookings) {
//       localStorage.setItem('bookings', JSON.stringify(initialBookings));
//       setBookings(initialBookings[selectedDateStr] || {});
//     } else {
//       const parsedBookings = JSON.parse(storedBookings);
//       setBookings(parsedBookings[selectedDateStr] || {});
//     }
//   }, []);

//   // Update rooms when location changes
//   useEffect(() => {
//     setRooms(locationRooms[selectedLocation]?.rooms || []);
//   }, [selectedLocation]);

//   // Update bookings when date changes
//   useEffect(() => {
//     const newDateStr = format(selectedDate, 'yyyy-MM-dd');
//     setSelectedDateStr(newDateStr);
    
//     const storedBookings = JSON.parse(localStorage.getItem('bookings') || '{}');
//     setBookings(storedBookings[newDateStr] || {});
//   }, [selectedDate]);

//   // Handle slot click
//   const handleSlotClick = (room, time) => {
//     const key = `${room.id}-${time}`;
    
//     if (bookings[key]) {
//       setSelectedSlot({ room, time, booking: bookings[key] });
//       setOpenDeleteDialog(true);
//     } else {
//       setSelectedSlot({ room, time });
//       setBookingForm({
//         ...bookingForm,
//         roomId: room.id,
//         time
//       });
//       setOpenBookingDialog(true);
//     }
//   };

//   // Handle new booking button click
//   const handleNewBooking = () => {
//     setSelectedSlot(null);
//     setBookingForm({
//       title: '',
//       description: '',
//       duration: '30m',
//       roomId: '',
//       time: ''
//     });
//     setOpenBookingDialog(true);
//   };

//   // Handle booking form submission
//   const handleBookingSubmit = () => {
//     try {
//       if (!bookingForm.title.trim()) {
//         alert("Please enter a title for your booking.");
//         return;
//       }
      
//       const roomId = selectedSlot ? selectedSlot.room.id : bookingForm.roomId;
//       const time = selectedSlot ? selectedSlot.time : bookingForm.time;
      
//       if (!roomId || !time) {
//         alert("Please select a room and time.");
//         return;
//       }
      
//       const key = `${roomId}-${time}`;
      
//       // Check if slot is already booked
//       const storedBookings = JSON.parse(localStorage.getItem('bookings') || '{}');
//       const dateBookings = storedBookings[selectedDateStr] || {};
      
//       if (dateBookings[key]) {
//         alert("This time slot is already booked. Please select another time or room.");
//         return;
//       }

//       // Create new booking
//       const newBooking = {
//         title: bookingForm.title,
//         description: bookingForm.description,
//         duration: bookingForm.duration,
//         status: 'active'
//       };

//       // Update localStorage
//       if (!storedBookings[selectedDateStr]) {
//         storedBookings[selectedDateStr] = {};
//       }
      
//       storedBookings[selectedDateStr][key] = newBooking;
//       localStorage.setItem('bookings', JSON.stringify(storedBookings));

//       // Update local state
//       setBookings(prevBookings => ({
//         ...prevBookings,
//         [key]: newBooking
//       }));
      
//       setOpenBookingDialog(false);
//     } catch (error) {
//       console.error("Error saving booking:", error);
//       alert("Failed to save booking. Please try again.");
//     }
//   };

//   // Handle booking deletion
//   const handleBookingDelete = () => {
//     try {
//       if (!selectedSlot) return;
      
//       const key = `${selectedSlot.room.id}-${selectedSlot.time}`;
//       const storedBookings = JSON.parse(localStorage.getItem('bookings') || '{}');
      
//       if (!storedBookings[selectedDateStr] || !storedBookings[selectedDateStr][key]) {
//         throw new Error('Booking not found');
//       }

//       // Track deleted bookings
//       if (!storedBookings.deleted) {
//         storedBookings.deleted = {};
//       }
//       if (!storedBookings.deleted[selectedDateStr]) {
//         storedBookings.deleted[selectedDateStr] = {};
//       }

//       storedBookings.deleted[selectedDateStr][key] = {
//         ...storedBookings[selectedDateStr][key],
//         status: 'deleted',
//         deleted_at: new Date().toISOString()
//       };

//       // Remove from active bookings
//       delete storedBookings[selectedDateStr][key];
//       localStorage.setItem('bookings', JSON.stringify(storedBookings));

//       // Update local state
//       setBookings(prevBookings => {
//         const updatedBookings = { ...prevBookings };
//         delete updatedBookings[key];
//         return updatedBookings;
//       });

//       setOpenDeleteDialog(false);
//     } catch (error) {
//       console.error("Error deleting booking:", error);
//       alert("Failed to delete booking. Please try again.");
//     }
//   };

//   // Function to check if a slot is booked
//   const isSlotBooked = (roomId, time) => {
//     const key = `${roomId}-${time}`;
//     return !!bookings[key];
//   };

//   // Function to get booking details
//   const getBookingDetails = (roomId, time) => {
//     const key = `${roomId}-${time}`;
//     return bookings[key];
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box sx={{ flexGrow: 1 }}>
//         <AppBar position="static" color="primary">
//           <Toolbar>
//             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//               Meeting Room Booking Calendar
//             </Typography>
//           </Toolbar>
//         </AppBar>
        
//         <Paper sx={{ p: 2, m: 2 }}>
//           <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
//             <Grid item xs={12} md={3}>
//               <FormControl fullWidth>
//                 <InputLabel>Location</InputLabel>
//                 <Select
//                   value={selectedLocation}
//                   label="Location"
//                   onChange={(e) => setSelectedLocation(e.target.value)}
//                 >
//                   <MenuItem value="ChennaiOTP">Chennai OTP</MenuItem>
//                   <MenuItem value="GC">Ganesh Chambers</MenuItem>
//                   <MenuItem value="Bangalore">Bangalore</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
            
//             <Grid item xs={12} md={3}>
//               <DatePicker
//                 label="Date"
//                 value={selectedDate}
//                 onChange={(newDate) => {
//                   if (isAfter(startOfDay(newDate), startOfDay(addDays(today, -1)))) {
//                     setSelectedDate(newDate);
//                   } else {
//                     alert("Cannot select a past date.");
//                   }
//                 }}
//                 renderInput={(params) => <TextField {...params} fullWidth />}
//               />
//             </Grid>
            
//             <Grid item xs={12} md={3}>
//               <Button
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 onClick={handleNewBooking}
//                 fullWidth
//               >
//                 New Booking
//               </Button>
//             </Grid>
//           </Grid>

//           <TableContainer component={Paper} sx={{ mb: 4 }}>
//             <Table sx={{ minWidth: 650 }} aria-label="meeting room booking table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Time</TableCell>
//                   {rooms.map((room) => (
//                     <TableCell key={room.id} align="center" sx={{ fontWeight: 'bold' }}>
//                       <Typography variant="subtitle1">{room.name}</Typography>
//                       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
//                         <Tooltip title={`Capacity: ${room.capacity}`}>
//                           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                             <PeopleIcon fontSize="small" />
//                             <Typography variant="caption">{room.capacity}</Typography>
//                           </Box>
//                         </Tooltip>
                        
//                         {room.facilities.includes('wifi') && (
//                           <Tooltip title="WiFi">
//                             <WifiIcon fontSize="small" />
//                           </Tooltip>
//                         )}
                        
//                         {room.facilities.includes('tv') && (
//                           <Tooltip title="TV">
//                             <TvIcon fontSize="small" />
//                           </Tooltip>
//                         )}
                        
//                         {room.facilities.includes('projector') && (
//                           <Tooltip title="Projector">
//                             <VideoCallIcon fontSize="small" />
//                           </Tooltip>
//                         )}
//                       </Box>
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {timeSlots.map((time) => (
//                   <TableRow key={time} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
//                     <TableCell component="th" scope="row">
//                       {time}
//                     </TableCell>
//                     {rooms.map((room) => {
//                       const isBooked = isSlotBooked(room.id, time);
//                       const booking = getBookingDetails(room.id, time);
                      
//                       return (
//                         <TableCell 
//                           key={`${room.id}-${time}`}
//                           align="center"
//                           onClick={() => handleSlotClick(room, time)}
//                           sx={{
//                             cursor: 'pointer',
//                             bgcolor: isBooked ? 'primary.main' : 'transparent',
//                             color: isBooked ? 'white' : 'inherit',
//                             '&:hover': {
//                               bgcolor: isBooked ? 'primary.dark' : '#e0e0e0',
//                             },
//                             height: '60px',
//                             transition: 'all 0.2s',
//                             padding: 1
//                           }}
//                         >
//                           {isBooked ? (
//                             <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
//                               {booking?.title}
//                             </Typography>
//                           ) : (
//                             <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                               Available
//                             </Typography>
//                           )}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
        
//         {/* Booking Dialog */}
//         <Dialog open={openBookingDialog} onClose={() => setOpenBookingDialog(false)} maxWidth="sm" fullWidth>
//           <DialogTitle>
//             New Meeting Room Booking
//             <IconButton
//               aria-label="close"
//               onClick={() => setOpenBookingDialog(false)}
//               sx={{ position: 'absolute', right: 8, top: 8 }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </DialogTitle>
//           <DialogContent dividers>
//             <Grid container spacing={2}>
//               {!selectedSlot && (
//                 <>
//                   <Grid item xs={12} md={6}>
//                     <FormControl fullWidth sx={{ mb: 2 }}>
//                       <InputLabel>Meeting Room</InputLabel>
//                       <Select
//                         value={bookingForm.roomId}
//                         label="Meeting Room"
//                         onChange={(e) => setBookingForm({...bookingForm, roomId: e.target.value})}
//                       >
//                         {rooms.map(room => (
//                           <MenuItem key={room.id} value={room.id}>{room.name}</MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
                  
//                   <Grid item xs={12} md={6}>
//                     <FormControl fullWidth sx={{ mb: 2 }}>
//                       <InputLabel>Time</InputLabel>
//                       <Select
//                         value={bookingForm.time}
//                         label="Time"
//                         onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
//                       >
//                         {timeSlots.map(time => (
//                           <MenuItem key={time} value={time}>{time}</MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                 </>
//               )}
              
//               {selectedSlot && (
//                 <>
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       label="Meeting Room"
//                       value={selectedSlot.room.name}
//                       fullWidth
//                       disabled
//                       sx={{ mb: 2 }}
//                     />
//                   </Grid>
                  
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       label="Time"
//                       value={selectedSlot.time}
//                       fullWidth
//                       disabled
//                       sx={{ mb: 2 }}
//                     />
//                   </Grid>
//                 </>
//               )}
              
//               <Grid item xs={12}>
//                 <TextField
//                   label="Title"
//                   value={bookingForm.title}
//                   onChange={(e) => setBookingForm({...bookingForm, title: e.target.value})}
//                   fullWidth
//                   required
//                   sx={{ mb: 2 }}
//                 />
//               </Grid>
              
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Date"
//                   type="date"
//                   value={selectedDateStr}
//                   InputLabelProps={{ shrink: true }}
//                   fullWidth
//                   disabled
//                   sx={{ mb: 2 }}
//                 />
//               </Grid>
              
//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth sx={{ mb: 2 }}>
//                   <InputLabel>Duration</InputLabel>
//                   <Select
//                     value={bookingForm.duration}
//                     label="Duration"
//                     onChange={(e) => setBookingForm({...bookingForm, duration: e.target.value})}
//                   >
//                     <MenuItem value="30m">30 minutes</MenuItem>
//                     <MenuItem value="1h">1 hour</MenuItem>
//                     <MenuItem value="1h30m">1 hour 30 minutes</MenuItem>
//                     <MenuItem value="2h">2 hours</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
              
//               <Grid item xs={12}>
//                 <TextField
//                   label="Description"
//                   value={bookingForm.description}
//                   onChange={(e) => setBookingForm({...bookingForm, description: e.target.value})}
//                   fullWidth
//                   multiline
//                   rows={4}
//                   sx={{ mb: 2 }}
//                 />
//                 <FormHelperText>{bookingForm.description.length}/500 characters</FormHelperText>
//               </Grid>
//             </Grid>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenBookingDialog(false)}>Cancel</Button>
//             <Button 
//               onClick={handleBookingSubmit} 
//               variant="contained" 
//               color="primary"
//               disabled={!bookingForm.title.trim() || (!selectedSlot && (!bookingForm.roomId || !bookingForm.time))}
//             >
//               Save
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Delete Booking Dialog */}
//         <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} maxWidth="sm">
//           <DialogTitle>
//             Meeting Room Booking Details
//             <IconButton
//               aria-label="close"
//               onClick={() => setOpenDeleteDialog(false)}
//               sx={{ position: 'absolute', right: 8, top: 8 }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </DialogTitle>
//           <DialogContent dividers>
//             {selectedSlot && selectedSlot.booking && (
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     label="Title"
//                     value={selectedSlot.booking.title}
//                     fullWidth
//                     disabled
//                     sx={{ mb: 2 }}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     label="Description"
//                     value={selectedSlot.booking.description}
//                     fullWidth
//                     multiline
//                     rows={4}
//                     disabled
//                     sx={{ mb: 2 }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     label="Room"
//                     value={selectedSlot.room.name}
//                     fullWidth
//                     disabled
//                     sx={{ mb: 2 }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     label="Time"
//                     value={selectedSlot.time}
//                     fullWidth
//                     disabled
//                     sx={{ mb: 2 }}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     label="Duration"
//                     value={selectedSlot.booking.duration}
//                     fullWidth
//                     disabled
//                     sx={{ mb: 2 }}
//                   />
//                 </Grid>
//               </Grid>
//             )}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenDeleteDialog(false)}>Close</Button>
//             <Button 
//               onClick={handleBookingDelete} 
//               variant="contained" 
//               color="error"
//               startIcon={<DeleteIcon />}
//             >
//               Cancel Reservation
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </LocalizationProvider>
//   );
// };

// export default MeetingRoomCalendar;