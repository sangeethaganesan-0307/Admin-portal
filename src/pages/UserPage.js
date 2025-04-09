import React from "react";
import BookingComponent from "../components/BookingComponent";
import Navigation from "../components/Navigation";
import NewBooking from "../components/NewBooking";
import Sidebar from "../components/Sidebar";
import DivComponent from "../components/DivComponent";
import UpcomingTableHeader from "../components/UpcomingTableHeader";
import { Box } from "@mui/material";
import TeamsCalendar from "../components/TeamsCalendar";
import { MeetingRoom } from "@mui/icons-material";
import MeetingRoomCalendar from "../components/MeetingRoomCalendar";



const UserPage = () => {
  return (
    <DivComponent>
      <Sidebar />
      <Navigation />
      {/* <NewBooking/> */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}> 
      <TeamsCalendar/>
      {/* <MeetingRoomCalendar/> */}
      <BookingComponent/> 
     
      </Box>
      {/* <TeamsCalendar/>
      <BookingComponent/>  */}
      </DivComponent>

);
};



{/* <Sidebar />
<Navigation />
<TeamsCalendar/>
<BookingComponent/>  */}

      


      // {/* <Box sx={{ marginBottom: '20px', padding: '10px', fontSize: '24px', fontWeight: 'bold', textAlign:'center' }}>
      //   <h1 style={{ color: 'black' }}>My Booking(Up coming)</h1> {/* Add your desired heading text here */}
      // {/* </Box> */} 
      // {/* <UpcomingTableHeader/> */}
    
//     // <DivComponent>
//     //   <Sidebar /> {/* Sidebar */}
//     //   <Navigation /> {/* Navigation Bar */}

//     //   {/* Main Content Section */}
//     //   <Box>
//     //     <NewBooking /> {/* Button Below Navigation */}
//     //     <UpcomingTableHeader /> {/* Table Header Above Table */}
//     //     <BookingComponent /> {/* Table */}
//     //   </Box>
//     // </DivComponent>
  
export default UserPage;

