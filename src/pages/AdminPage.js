import React from "react";
import Navigation from "../components/Navigation";
import AdminPageTable from "../components/AdminPageTable";
import Sidebar from "../components/Sidebar";
import DivComponent from "../components/DivComponent";
import { Box } from "@mui/material";
import NewBooking from "../components/NewBooking";
//import UpcomingTableHeader from "../components/UpcomingTableHeader";
import CreateLocationButton from "../components/CreateLocationButton";
import CreateRoomButton from "../components/CreateRoomButton";
import { useEffect } from "react";
import { useState } from "react";
import TeamsCalendar from "../components/TeamsCalendar";
import MeetingRoomCalendar from "../components/MeetingRoomCalendar";


const AdminPage = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Manually set userRole for testing
    localStorage.setItem("userRole", "Admin"); // Change to "SuperAdmin" if needed
    setUserRole(localStorage.getItem("userRole")); // Fetch userRole
  }, []);

  console.log("User Role:", userRole); // Debugging output

  return (
    <DivComponent>
      <Sidebar userRole={userRole} /> {/* Pass userRole to Sidebar */}
      <Navigation  userRole="admin" />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TeamsCalendar userRole="admin" />
        {/* <MeetingRoomCalendar/> */}
        <AdminPageTable />
      </Box>
    </DivComponent>
  );
};


export default AdminPage;