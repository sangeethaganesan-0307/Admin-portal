// this is for the user page but no need of this since the h1 tag is added in the booking componnet itself

// import React from 'react';
// import { Box } from '@mui/system';

// const UpcomingTableHeader = () => {
//     return(
//         <>
//  {/* h1 element placed between button and table */}
//       {/* <h2 style={{ textAlign: 'Left', marginTop: '100px' }}>My Booking (Up coming)</h2> */}
    
//       <Box
//         sx={{
//         //   width: '1198px',
//           width:'100%',
//           height: '25px',
//           position: 'absolute',
//         //   top: '727px',
//            top: '120px',
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
//       </Box>
//    </>
//     );
// };
// export default UpcomingTableHeader;



//this for the admin page alone
import React from "react";
import { Box } from "@mui/material";

const UpcomingTableHeader = () => {
    // console.log("UpcomingTableHeader component is rendering!"); 
  return (
    <Box
      sx={{
         width: "1050px",
        //width: "100%",
        height: "50px",
        gap: "10px",
        paddingTop: "10px",
        paddingRight: "10px",
        paddingBottom: "10px",
        borderBottomWidth: "1px",
        //borderBottomStyle: "solid", 
         borderBottomColor: "#FFFFFF", 
        backgroundColor: "black",
        display: "flex",
        alignItems: "Left",
        //justifyContent: "center",
        marginTop: "600px",
        marginLeft: "220px",
        position: 'absolute',
      }}
    >
      <h1
        style={{
          width: "332px",
          height: "24px",
          fontFamily: "Inter",
          fontWeight: 600,
          fontSize: "20px",
          lineHeight: "24.2px",
          letterSpacing: "0%",
          color: "white",
          marginLeft: "220px",
          paddingRight: "40px"
        }}
      >
        My Booking (Up Coming) 
      </h1>
     </Box>
  );
};

export default UpcomingTableHeader;
