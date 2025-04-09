// import React, { useState } from 'react';
// import { Button, Snackbar, Alert } from '@mui/material';
// import { Box } from '@mui/system';
// import BookingComponent from './BookingComponent'; // Assuming this is your table component

// const NewBooking = () => {
//   const [openToast, setOpenToast] = useState(false);

//   const handleBookingClick = () => {
//     setOpenToast(true);
//   };

//   const handleCloseToast = () => {
//     setOpenToast(false);
//   };

//   return (
//     <Box sx={{ paddingTop: '70px' }}> {/* Ensuring the table is not hidden under navbar */}
//       {/* Book Meeting Room Button */}
//       <Box sx={{
//         position: 'relative',
//         paddingBottom: '20px', // Space below button
//         marginTop: '20px', // Space between navbar and button
//         display: 'flex',
//         justifyContent: 'center',
//       }}>
//         <Button 
//           variant="contained" 
//           color="primary" 
//           onClick={handleBookingClick}
//           sx={{
//             borderRadius: '20px',
//             padding: '10px 20px',
//             fontSize: '16px',
//           }}
//         >
//           Book Meeting Room
//         </Button>
//       </Box>

//       {/* Booking Component Table (assuming this is your table) */}
//       <BookingComponent />

//       {/* Snackbar Toast Message */}
//       <Snackbar
//         open={openToast}
//         autoHideDuration={3000}
//         onClose={handleCloseToast}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'center',
//         }}
//       >
//         <Alert 
//           onClose={handleCloseToast} 
//           severity="success" 
//           sx={{ width: '100%' }}
//         >
//           Successfully Booked the Meeting Room!
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default NewBooking;

// 

// import React, { useState } from 'react';
// import { Button, Snackbar, Alert } from '@mui/material';
// import { Box } from '@mui/system';
// import BookingComponent from './BookingComponent'; // Assuming this is your table component

// const NewBooking = () => {
//   const [openToast, setOpenToast] = useState(false);

//   const handleBookingClick = () => {
//     setOpenToast(true);
//   };

//   const handleCloseToast = () => {
//     setOpenToast(false);
//   };

//   return (
//     <Box sx={{ paddingTop: '70px' }}> {/* Ensuring the table is not hidden under navbar */}
//       {/* Book Meeting Room Button */}
//       <Box sx={{
//         position: 'absolute',
//         top: '80px', // Adjust this as needed to align with your navbar
//         right: '20px', // Positioned on the right side
//       }}>
//         <Button 
//           variant="contained" 
//           color="primary" 
//           onClick={handleBookingClick}
//           sx={{
//             padding: '8px 16px',  // Reducing the button size
//             fontSize: '14px',     // Smaller text size
//           }}
//         >
//           Book Meeting Room
//         </Button>
//       </Box>

//       {/* Booking Component Table (assuming this is your table) */}
//       <BookingComponent />

//       {/* Snackbar Toast Message */}
//       <Snackbar
//         open={openToast}
//         autoHideDuration={3000}
//         onClose={handleCloseToast}
//         anchorOrigin={{
//           vertical: 'top',   // Positioning it above the navbar
//           horizontal: 'center',
//         }}
//         sx={{
//           marginTop: '80px',  // Adds spacing above the toast to position it above the navbar
//         }}
//       >
//         <Alert 
//           onClose={handleCloseToast} 
//           severity="success" 
//           sx={{ width: '100%' }}
//         >
//           Successfully Booked the Meeting Room!
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default NewBooking;


// //this works fine
// import React, { useState } from 'react';
// import { Button, Snackbar, Alert } from '@mui/material';
// import { Box } from '@mui/system';
// import BookingComponent from './BookingComponent'; // Assuming this is your table component
// import AdminPageTable from './AdminPageTable';
// import CreateLocationButton from './CreateLocationButton';
// import CreateRoomButton from './CreateRoomButton';
// import TeamsCalendar from './TeamsCalendar';

// const NewBooking = () => {
//   const [openToast, setOpenToast] = useState(false);

//   const handleBookingClick = () => {
//     setOpenToast(true);
//   };

//   const handleCloseToast = () => {
//     setOpenToast(false);
//   };

//   return (
//     <Box sx={{ paddingTop: '0px' }}> 
//         {/* <Box sx={{ paddingTop: '70px' }}> */}
//       <Box sx={{
//         position: 'absolute',
//         top: '82px', // Adjust this as needed to position the button
//         right: '20px', // Positioned on the right side
//         marginBottom: '30px',
        
//       }}>
//         {/* <Button 
//           variant="contained" 
//           color="primary" 
//           onClick={handleBookingClick}
//           sx={{
//             padding: '8px 16px',  // Reducing the button size
//             fontSize: '14px',     // Smaller text size
//           }}
//         >
//           New Meeting 
//         </Button> */}
//       </Box>

//       {/* h1 element placed between button and table */}
//       {/* <h2 style={{ textAlign: 'Left', marginTop: '100px' }}>My Booking (Up coming)</h2> */}
      
//       {/* <Box
//         sx={{
//         //   width: '1198px',
//           width:'100%',
//           height: '25px',
//           position: 'absolute',
//         //   top: '727px',
//            top: '120px'
//           left: '230px',
//           backgroundColor: 'White',
//           display: 'flex',
//           alignItems: 'left', // Vertically center the content
//           //justifyContent: 'center', // Horizontally center the content
//           marginTop: '20px'
//         }}
//       >
//         <h1 style={{
//           fontFamily: 'Plus Jakarta Sans',
//           fontWeight: 600,
//           fontSize: '20px',
//           lineHeight: '25.2px',
//           letterSpacing: '0%',
//           color: 'Black', // Ensure text is visible on the dark background
//           margin: 0, // Remove default margin
//         }}>
//           My Booking (Upcoming)
//         </h1>
//       </Box> */}
//       <TeamsCalendar/>
//       <BookingComponent />
//       {/* <CreateLocationButton/>
//       <CreateRoomButton/>
//       <AdminPageTable/> */}
      

//       {/* Snackbar Toast Message */}
//       <Snackbar
//         open={openToast}
//         autoHideDuration={3000}
//         onClose={handleCloseToast}
//         anchorOrigin={{
//           vertical: 'top',   // Positioning it above the navbar
//           horizontal: 'center',
//         }}
//         sx={{
//           top: 0,  // This ensures the toast is placed right at the top
//         }}
//       >
//         <Alert 
//           onClose={handleCloseToast} 
//           severity="success" 
//           sx={{ width: '100%' }}
//         >
//           Successfully Booked the Meeting Room!
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default NewBooking;



import React, { useState } from 'react';
import { Button, Snackbar, Alert, Box } from '@mui/material';

const NewBooking = () => {
  const [openToast, setOpenToast] = useState(false);

  const handleClick = () => {
    setOpenToast(true);
  };

  const handleClose = () => {
    setOpenToast(false);
  };

  return (
    <Box>
      {/* New Booking Button */}
      <Button variant="contained" color="primary" onClick={handleClick}>
        Create New Booking
      </Button>

      {/* Toast Notification */}
      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Booking created successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NewBooking;
