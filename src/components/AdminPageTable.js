//this is perfect code 
import React, { useState, useEffect } from "react";
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box,
    Select, MenuItem, ToggleButtonGroup, ToggleButton, TextField, Button
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import dayjs from "dayjs";
import { roomBookedUsers } from "./UserData";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {  InputAdornment } from "@mui/material";
import AdminPageTableStyles from "./AdminPageTableStyles";

const { dateTextFieldStyle, iconStyle } = AdminPageTableStyles;

const AdminPageTable = ({ rows }) => {
    const styles = AdminPageTableStyles;
    const [visibleRows, setVisibleRows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (roomBookedUsers && roomBookedUsers.length > 0) {
            setVisibleRows(roomBookedUsers.slice(0, 4)); // Initially load 4 rows
        }
        return () => {
            setVisibleRows([]);
        };
    }, []);


    


    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.target;

        if (scrollHeight - scrollTop <= clientHeight + 20 && !isLoading) {
            setIsLoading(true);
            setTimeout(() => {
                const currentLength = visibleRows.length;
                const nextRows = roomBookedUsers.slice(currentLength, currentLength + 4);

                if (nextRows.length > 0) {
                    setVisibleRows(prev => [...prev, ...nextRows]);
                }
                setIsLoading(false);
            }, 500);
        }
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

    const [view, setView] = useState("day"); // Step 1: Add view state

const handleViewChange = (event, newView) => { // Step 1: Add handler function
    if (newView !== null) {
        setView(newView);
    }
};
const [selectedDate, setSelectedDate] = useState(null);

const handleDownload = (row) => {
    // Implement your download logic here
    console.log("Downloading report for:", row);
};

    return (
        <div>
            <Box style={{ display:"flex", justifyContent: "space-between", marginTop: "20px",}}>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    My Booking (Upcoming)
                </Typography>

                <Box style={{ display: "flex", gap: "10px", paddingright: "0px" }}>
                    {/* <Select size="small" value="" displayEmpty>
                        <MenuItem value="" disabled>Room Name</MenuItem>
                        <MenuItem value="Room A">Room A</MenuItem>
                        <MenuItem value="Room B">Room B</MenuItem>
                    </Select> */}

                    <Select size="small" value="" displayEmpty sx={styles.roomNameSelect}>
                        <MenuItem value="" disabled>
                            <span style={styles.menuItemText}>Room Name</span>
                        </MenuItem>
                        <MenuItem value="Room A">Room A</MenuItem>
                        <MenuItem value="Room B">Room B</MenuItem>
                    </Select>
                    {/* <Select size="small" value="" displayEmpty>
                        <MenuItem value="" disabled>Meeting Type</MenuItem>
                        <MenuItem value="Internal">Internal</MenuItem>
                        <MenuItem value="External">External</MenuItem>
                    </Select>
                     */}

                    <Select size="small" value="" displayEmpty sx={styles.selectOuterLayout}>
                        <MenuItem value="" disabled>
                            <span style={styles.textLayout}>Meeting Type</span>
                        </MenuItem>
                        <MenuItem value="Internal">
                            <span style={styles.textLayout}>Internal</span>
                        </MenuItem>
                        <MenuItem value="External">
                            <span style={styles.textLayout}>External</span>
                        </MenuItem>
                    </Select>


                    {/* <Select size="small" value="" displayEmpty>
                        <MenuItem value="" disabled>Status</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Approved">Approved</MenuItem>
                    </Select> */}

                    <Select
                        size="small"
                        value=""
                        displayEmpty
                        sx={styles.statusSelect}>
                        <MenuItem value="" disabled>
                            <span style={styles.statusText}>Status</span>
                        </MenuItem>
                        <MenuItem value="Pending">
                            <span style={styles.statusText}>Pending</span>
                        </MenuItem>
                        <MenuItem value="Approved">
                            <span style={styles.statusText}>Approved</span>
                        </MenuItem>
                        <MenuItem value="Denied">
                            <span style={styles.statusText}>Denied</span>
                        </MenuItem>
    
                    </Select>

                    {/* <ToggleButtonGroup size="small" exclusive value={view} onChange={handleViewChange}>
                        <ToggleButton value="day" style={{ backgroundColor: view === "day" ? "blue" : "", color: view === "day" ? "white" : "" }}>
                            Day
                        </ToggleButton>
                        <ToggleButton value="week" style={{ backgroundColor: view === "week" ? "blue" : "", color: view === "week" ? "white" : "" }}>
                            Week
                        </ToggleButton>
                        <ToggleButton value="month" style={{ backgroundColor: view === "month" ? "blue" : "", color: view === "month" ? "white" : "" }}>
                            Month
                        </ToggleButton>
                        <ToggleButton value="year" style={{ backgroundColor: view === "year" ? "blue" : "", color: view === "year" ? "white" : "" }}>
                            Year
                        </ToggleButton>
                    </ToggleButtonGroup> */}


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

                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker renderInput={(params) => <TextField {...params} size="small" />} />
                    </LocalizationProvider> */}



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
                disableUnderline:true,
              startAdornment: ( 
                <InputAdornment position="end">
                  <CalendarMonthIcon style={iconStyle} />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </LocalizationProvider>
                </Box>
            </Box>
                
            <TableContainer component={Paper} style={AdminPageTableStyles.tableContainer} onScroll={handleScroll}>
                <Table>
                    <TableHead>
                        <TableRow style={styles.tableHead}>
                            <TableCell style={styles.tableHead}>ID</TableCell>
                            <TableCell style={styles.tableHead}>Meeting Room</TableCell>
                            <TableCell style={styles.tableHead}>Booked By</TableCell>
                            <TableCell style={styles.tableHead}>Employee ID</TableCell>
                            <TableCell style={styles.tableHead}>Meeting Date</TableCell>
                            <TableCell style={styles.tableHead}>Start Time</TableCell>
                            <TableCell style={styles.tableHead}>End Time</TableCell>
                            <TableCell style={styles.tableHead}>Meeting Type</TableCell>
                            <TableCell style={styles.tableHead}>Requested On</TableCell>
                            <TableCell style={styles.tableHead}>Approved</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.map((row, index) => (
                            <TableRow key={index} style={styles.rowStyle(index)}>
                                <TableCell style={styles.bodyCell}>{row.id}</TableCell>
                                <TableCell style={styles.bodyCell}>{row.mRoomName}</TableCell>
                                <TableCell style={styles.bodyCell}>{row.bookedBy}</TableCell>
                                <TableCell style={styles.bodyCell}>{row.employeeId}</TableCell>
                                <TableCell style={styles.bodyCell}>{row.mDate}</TableCell>
                                <TableCell style={styles.bodyCell}>{row.startTime}</TableCell>
                                <TableCell style={styles.bodyCell}>{row.endTime}</TableCell>
                                <TableCell style={styles.bodyCell}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box
                                            sx={{
                                                width: 6,
                                                height: 6,
                                                borderRadius: '50%',
                                                backgroundColor: getTypeColor(row.meetingType),
                                            }}
                                        />
                                        <Typography>{row.meetingType}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell style={styles.bodyCell}>{row.requestedOn}</TableCell>
                                <TableCell style={styles.bodyCell}>{row.approved}</TableCell>
                            </TableRow>
                        ))}
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">Loading more...</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            

        </div>

    

    );
};
export default AdminPageTable;

