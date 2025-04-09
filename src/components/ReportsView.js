import React, { useState, useEffect } from "react";
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box,
    Select, MenuItem, ToggleButtonGroup, ToggleButton, TextField, Button, InputAdornment
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dayjs from "dayjs";
import { roomBookedUsers } from "./UserData";
import AdminPageTableStyles from "./AdminPageTableStyles";

const ReportsView = () => {
    const styles = AdminPageTableStyles;
    const [visibleRows, setVisibleRows] = useState([]);
    const [view, setView] = useState("day");
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        if (roomBookedUsers && roomBookedUsers.length > 0) {
            setVisibleRows(roomBookedUsers.slice(0, 4)); // Initially load 4 rows
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
        // Implement your download logic here
        console.log("Downloading report for:", row);
    };

    return (
        <div>
            <Box style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                {/* <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    My Booking (Upcoming)
                </Typography> */}
                <Box style={{ display: "flex", gap: "10px", paddingRight: "0px" }}>
                    <Select size="small" value="" displayEmpty sx={styles.roomNameSelect}>
                        <MenuItem value="" disabled>
                            <span style={styles.menuItemText}>Priority</span>
                        </MenuItem>
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                    </Select>
                    <Select size="small" value="" displayEmpty sx={styles.roomNameSelect}>
                        <MenuItem value="" disabled>
                            <span style={styles.menuItemText}>Room Name</span>
                        </MenuItem>
                        <MenuItem value="Room A">Room A</MenuItem>
                        <MenuItem value="Room B">Room B</MenuItem>
                    </Select>
                    <Select size="small" value="" displayEmpty sx={styles.statusSelect}>
                        <MenuItem value="" disabled>
                            <span style={styles.statusText}>Status</span>
                        </MenuItem>
                        <MenuItem value="Pending">
                            <span style={styles.statusText}>Pending</span>
                        </MenuItem>
                        <MenuItem value="Approved">
                            <span style={styles.statusText}>Approved</span>
                        </MenuItem>
                    </Select>
                    <ToggleButtonGroup
                        size="small"
                        exclusive
                        value={view}
                        onChange={handleViewChange}
                        sx={styles.toggleButtonGroup}
                    >
                        {["day", "week", "month", "year"].map((value) => (
                            <ToggleButton
                                key={value}
                                value={value}
                                style={{
                                    backgroundColor: view === value ? "blue" : "",
                                    color: view === value ? "white" : "",
                                }}
                            >
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={selectedDate}
                            onChange={(newDate) => setSelectedDate(newDate)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    size="small"
                                    InputProps={{
                                        disableUnderline: true,
                                        startAdornment: (
                                            <InputAdornment position="end">
                                                <CalendarMonthIcon style={{ marginRight: 8 }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </LocalizationProvider>
                </Box>
            </Box>
            <TableContainer component={Paper} style={styles.tableContainer}>
                <Table>
                    <TableHead>
                        <TableRow style={styles.tableHead}>
                            <TableCell style={styles.tableHead}>ID</TableCell>
                            <TableCell style={styles.tableHead}>Name</TableCell>
                            <TableCell style={styles.tableHead}>M. Start Date</TableCell>
                            <TableCell style={styles.tableHead}>M. Start Time</TableCell>
                            <TableCell style={styles.tableHead}>M. End Date</TableCell>
                            <TableCell style={styles.tableHead}>M. End Time</TableCell>
                            <TableCell style={styles.tableHead}>Duration</TableCell>
                            <TableCell style={styles.tableHead}>Priority</TableCell>
                            <TableCell style={styles.tableHead}>M. Room Name</TableCell>
                            <TableCell style={styles.tableHead}>Status</TableCell>
                            
                            <TableCell style={styles.tableHead}>Download</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.map((row, index) => (
                            <TableRow key={index} style={styles.rowStyle(index)}>
                                <TableCell style={styles.bodyCell}>{row.id}</TableCell>
                                <TableCell style={styles.bodyCell}>{row.name}</TableCell>
                                <TableCell style={styles.bodyCell}>{row.mStartDate}</TableCell>
                                <TableCell style={styles.bodyCell}>{row.mStartTime}</TableCell>
                                <TableCell style={styles.bodyCell}>{row.mEndDate}</TableCell>
                                <TableCell style={styles.bodyCell}>{row.mEndTime}</TableCell>
                                <TableCell style={styles.bodyCell}>{row.duration}</TableCell>
                                <TableCell style={styles.bodyCell}>{row.priority}</TableCell>
                                <TableCell style={styles.bodyCell}>{row.mRoomName}</TableCell>
                                <TableCell style={styles.bodyCell}>{row.status}</TableCell>
                                <TableCell style={{ ...styles.bodyCell, position: 'sticky', right: 0, zIndex: 1 }}>
                               
                                <Button variant="contained" onClick={() => handleDownload(row)}>
                                    Download
                                </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ReportsView;