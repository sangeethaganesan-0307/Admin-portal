//this works fine
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import SuperAdminPage from "./pages/SuperAdminPage";
import TeamsCalendar from "./components/TeamsCalendar";
import AdminPageTable from "./components/AdminPageTable";
import ReportTable from "./components/ReportTable";

const App = () => {
  return( 
    
    <Router>
      <Routes>
      
      {/* <Route path="/" element={<SuperAdminPage />} />   */}
      
      <Route path="/admin" element={<AdminPage />} />  
      <Route path="/admin/reports" element={<ReportTable />} />
       {/* <Route path="/" element={<UserPage />} /> 
        <Route path="/user" element={<UserPage />} />    */}
        <Route path="/" element={<AdminPage />} />     
        {/* <Route path="/super-admin" element={<SuperAdminPage />} />   */}
      </Routes>
    </Router>
    // <TeamsCalendar/>
  );
  
};

export default App;


