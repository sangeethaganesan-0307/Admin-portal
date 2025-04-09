import React, { useState, useEffect } from "react";
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box,
    Select, MenuItem, ToggleButtonGroup, ToggleButton, TextField, Button, IconButton
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import DownloadIcon from "@mui/icons-material/Download";
import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { roomBookedUsers } from "./UserData"; // Import the same data source
import AdminPageTableStyles from "./AdminPageTableStyles";
const ReportTable = () => {
    const [visibleRows, setVisibleRows] = useState([]);
    const [view, setView] = useState("day");
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Using the same approach as AdminPageTable
    useEffect(() => {
        if (roomBookedUsers && roomBookedUsers.length > 0) {
            setVisibleRows(roomBookedUsers.slice(0, 6)); // Initially load 6 rows
        }
        return () => {
            setVisibleRows([]);
        };
    }, []);

    const handleViewChange = (event, newView) => {
        if (newView !== null) {
            setView(newView);
        }
    };

    const handleDownload = (row) => {
        const doc = new jsPDF();
        
        // Set title
        doc.setFontSize(16);
        doc.text("Meeting Room Booking Report", 14, 15);
        
        // Add booking details directly from the row
        doc.setFontSize(12);
        doc.text(`Booking ID: ${row.id}`, 14, 25);
        doc.text(`Meeting Room: ${row.mRoomName}`, 14, 32);
        doc.text(`Booked By: ${row.bookedBy}`, 14, 39);
        doc.text(`Employee ID: ${row.employeeId}`, 14, 46);
        doc.text(`Meeting Date: ${row.mDate}`, 14, 53);
        doc.text(`Time: ${row.startTime} - ${row.endTime}`, 14, 60);
        doc.text(`Meeting Type: ${row.meetingType}`, 14, 67);
        doc.text(`Requested On: ${row.requestedOn}`, 14, 74);
        doc.text(`Status: ${row.approved === "Yes" ? "APPROVED" : "DENIED"}`, 14, 81);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 88);
        
        // Save PDF
        doc.save(`booking-report-${row.id}.pdf`);
    };

    const getTypeColor = (type) => {
        switch (type.toLowerCase()) {
            case 'internal':
                return '#FCD34D';
            case 'external':
                return '#6B7280';
            default:
                return '#6B7280';
        }
    };

    // const styles = {
    //     tableContainer: {
    //         marginTop: "10px",
    //         border: "1px solid #e0e0e0",
    //         borderRadius: "4px",
    //         maxHeight: "calc(100vh - 250px)",
    //         overflowY: "auto",
    //     },
    //     tableHead: {
    //         backgroundColor: "#F3F4F6",
    //         color: "#374151",
    //         fontWeight: "bold",
    //         fontSize: "0.8rem",
    //         borderBottom: "2px solid #e0e0e0",
    //         padding: "8px 16px",
    //     },
    //     bodyCell: {
    //         padding: "12px 16px",
    //         borderBottom: "1px solid #e0e0e0",
    //         fontSize: "0.85rem",
    //     },
    //     rowStyle: (index) => ({
    //         backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F9FAFB",
    //     }),
    //     paginationContainer: {
    //         display: "flex",
    //         justifyContent: "flex-end",
    //         alignItems: "center",
    //         margin: "10px 0",
    //         gap: "8px",
    //     },
    //     pageButton: {
    //         minWidth: "32px",
    //         height: "32px",
    //         padding: "4px",
    //         fontWeight: currentPage === 1 ? "bold" : "normal",
    //         border: currentPage === 1 ? "1px solid #2563EB" : "1px solid #e0e0e0",
    //         borderRadius: "4px",
    //         display: "flex",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         cursor: "pointer",
    //         backgroundColor: currentPage === 1 ? "#EFF6FF" : "#FFFFFF",
    //         color: currentPage === 1 ? "#2563EB" : "#374151",
    //     },
    //     statusChip: (status) => ({
    //         backgroundColor: status === "Yes" ? "#F0F9F0" : "#FEF2F2", 
    //         color: status === "Yes" ? "#047857" : "#B91C1C",
    //         border: "none",
    //         borderRadius: "4px",
    //         padding: "4px 8px",
    //         fontSize: "0.7rem",
    //         fontWeight: "bold",
    //     }),
    // };

    return (
        <div>
            <Box style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                {/* <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    Reports
                </Typography> */}

                <Box style={{ display: "flex", gap: "10px" }}>
                    <Select
                        size="small"
                        value=""
                        displayEmpty
                        style={{ minWidth: "100px" }}
                    >
                        <MenuItem value="" disabled>Priority</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="low">Low</MenuItem>
                    </Select>

                    <Select
                        size="small"
                        value=""
                        displayEmpty
                        style={{ minWidth: "120px" }}
                    >
                        <MenuItem value="" disabled>Room Name</MenuItem>
                        <MenuItem value="room1">Meeting Room 1</MenuItem>
                        <MenuItem value="room2">Meeting Room 2</MenuItem>
                        <MenuItem value="room3">Meeting Room 3</MenuItem>
                    </Select>

                    <Select
                        size="small"
                        value=""
                        displayEmpty
                        style={{ minWidth: "100px" }}
                    >
                        <MenuItem value="" disabled>Status</MenuItem>
                        <MenuItem value="approved">Approved</MenuItem>
                        <MenuItem value="denied">Denied</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                    </Select>

                    <ToggleButtonGroup
                        size="small"
                        exclusive
                        value={view}
                        onChange={handleViewChange}
                    >
                        <ToggleButton
                            value="day"
                            style={{
                                backgroundColor: view === "day" ? "#6B7280" : "",
                                color: view === "day" ? "white" : "",
                            }}
                        >
                            Day
                        </ToggleButton>
                        <ToggleButton
                            value="week"
                            style={{
                                backgroundColor: view === "week" ? "#6B7280" : "",
                                color: view === "week" ? "white" : "",
                            }}
                        >
                            Week
                        </ToggleButton>
                        <ToggleButton
                            value="month"
                            style={{
                                backgroundColor: view === "month" ? "#6B7280" : "",
                                color: view === "month" ? "white" : "",
                            }}
                        >
                            Month
                        </ToggleButton>
                        <ToggleButton
                            value="year"
                            style={{
                                backgroundColor: view === "year" ? "#6B7280" : "",
                                color: view === "year" ? "white" : "",
                            }}
                        >
                            Year
                        </ToggleButton>
                    </ToggleButtonGroup>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={selectedDate}
                            onChange={(newDate) => setSelectedDate(newDate)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size="small"
                                />
                            )}
                        />
                    </LocalizationProvider>
                </Box>
            </Box>

            <TableContainer component={Paper} style={AdminPageTableStyles.tableContainer} >
                <Table>
                    <TableHead style={AdminPageTableStyles.tableHead}>
                        <TableRow>
                            <TableCell style={AdminPageTableStyles.tableHead}>ID</TableCell>
                            <TableCell style={AdminPageTableStyles.tableHead}>Name</TableCell>
                            <TableCell style={AdminPageTableStyles.tableHead}>Start Date</TableCell>
                            <TableCell style={AdminPageTableStyles.tableHead}>Start Time</TableCell>
                            <TableCell style={AdminPageTableStyles.tableHead}>End Date</TableCell>
                            <TableCell style={AdminPageTableStyles.tableHead}>End Time</TableCell>
                            <TableCell style={AdminPageTableStyles.tableHead}>Duration</TableCell>
                            <TableCell style={AdminPageTableStyles.tableHead}>Priority</TableCell>
                            <TableCell style={AdminPageTableStyles.tableHead}>Room Name</TableCell>
                            <TableCell style={AdminPageTableStyles.tableHead}>Status</TableCell>
                            <TableCell style={AdminPageTableStyles.tableHead}>Download</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.map((row, index) => (
                            <TableRow key={index} style={AdminPageTableStyles.rowStyle(index)}>
                                <TableCell style={AdminPageTableStyles.bodyCell}>{row.id}</TableCell>
                                <TableCell style={AdminPageTableStyles.bodyCell}>{row.bookedBy}</TableCell>
                                <TableCell style={AdminPageTableStyles.bodyCell}>{row.mDate}</TableCell>
                                <TableCell style={AdminPageTableStyles.bodyCell}>{row.startTime}</TableCell>
                                <TableCell style={AdminPageTableStyles.bodyCell}>{row.mDate}</TableCell>
                                <TableCell style={AdminPageTableStyles.bodyCell}>{row.endTime}</TableCell>
                                <TableCell style={AdminPageTableStyles.bodyCell}>30 MIN</TableCell>
                                <TableCell style={AdminPageTableStyles.bodyCell}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box
                                            sx={{
                                                width: 6,
                                                height: 6,
                                                borderRadius: '50%',
                                                backgroundColor: getTypeColor(row.meetingType),
                                            }}
                                        />
                                        <Typography>{row.meetingType === "Internal" ? "High" : "Medium"}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell style={AdminPageTableStyles.bodyCell}>{row.mRoomName}</TableCell>
                                <TableCell style={AdminPageTableStyles.bodyCell}>
                                    <span style={AdminPageTableStyles.statusChip(row.approved)}>
                                        {row.approved === "Yes" ? "APPROVED" : "DENIED"}
                                    </span>
                                </TableCell>
                                <TableCell style={AdminPageTableStyles.bodyCell}>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDownload(row)}
                                        color="primary"
                                    >
                                        <DownloadIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={11} align="center">Loading more...</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box style={AdminPageTableStyles.paginationContainer}>
                <Button size="small" disabled>
                    Prev
                </Button>
                <Box style={AdminPageTableStyles.pageButton}>01</Box>
                <Box style={{ ...AdminPageTableStyles.pageButton, fontWeight: "normal", backgroundColor: "#FFFFFF" }}>
                    02
                </Box>
                <Box style={{ ...AdminPageTableStyles.pageButton, fontWeight: "normal", backgroundColor: "#FFFFFF" }}>
                    ...
                </Box>
                <Box style={{ ...AdminPageTableStyles.pageButton, fontWeight: "normal", backgroundColor: "#FFFFFF" }}>
                    05
                </Box>
                <Button size="small">
                    Next
                </Button>
            </Box>
        </div>
    );
};

export default ReportTable;