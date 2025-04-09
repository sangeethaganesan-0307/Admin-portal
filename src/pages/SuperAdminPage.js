import React from "react";
import TeamsCalendar from "../components/TeamsCalendar";
import AdminPageTable from "../components/AdminPageTable";
import Sidebar from "../components/Sidebar";
import DivComponent from "../components/DivComponent";
import Navigation from "../components/Navigation";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import MeetingRoomCalendar from "../components/MeetingRoomCalendar";

const SuperAdminPage = () => {
  const [userRole, setUserRole] = useState("");
  
    useEffect(() => {
      // Manually set userRole for testing
      localStorage.setItem("userRole", "SuperAdmin"); // Change to "SuperAdmin" if needed
      setUserRole(localStorage.getItem("userRole")); // Fetch userRole
    }, []);
  
    console.log("User Role:", userRole); // Debugging output
  
    return (
      <DivComponent>
        <Sidebar userRole={userRole} /> {/* Pass userRole to Sidebar */}
        <Navigation />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TeamsCalendar />
          {/* <MeetingRoomCalendar/> */}
          <AdminPageTable />
        </Box>
      </DivComponent>
    );
};

export default SuperAdminPage;
