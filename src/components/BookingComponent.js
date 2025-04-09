import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { roomBookedUsers } from "./UserData";
import BookingComponentStyles from "./BookingComponentStyles";
const BookingComponent = ({ rows }) => {
  const [visibleRows, setVisibleRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (roomBookedUsers && roomBookedUsers.length > 0) {
      setVisibleRows(roomBookedUsers.slice(0, 4));
    }
  }, [rows]);

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    if (scrollHeight - scrollTop <= clientHeight + 20) {
      if (!isLoading) {
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
    }
  };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <h1 style={{
        width: "100%",
        fontFamily: "Plus Jakarta Sans",
        fontWeight: 600,
        fontSize: "20px",
        lineHeight: "25.2px",
        letterSpacing: "0%",
        marginTop: "30px",
        color: "Black",
        margin: 0
      }}>
        My Booking (Upcoming)
      </h1>

      <TableContainer component={Paper} style={BookingComponentStyles.tableContainer} onScroll={handleScroll}>
        <Table>
          <TableHead style={BookingComponentStyles.tableHead}>
            <TableRow style={{ backgroundColor: "#111827", color: "white", borderRadius: "5px 5px 0 0" }}>
              <TableCell style={{ color: "white", fontWeight: "600", padding: "12px 15px" }}>Name</TableCell>
              <TableCell style={{ color: "white", fontWeight: "600", padding: "12px 15px" }}>Reservation Date</TableCell>
              <TableCell style={{ color: "white", fontWeight: "600", padding: "12px 15px" }}>Time</TableCell>
              <TableCell style={{ color: "white", fontWeight: "600", padding: "12px 15px" }}>Meeting Room Name</TableCell>
              <TableCell style={{ color: "white", fontWeight: "600", padding: "12px 15px" }}>Type of Priority</TableCell>
              <TableCell style={{ color: "white", fontWeight: "600", padding: "12px 15px" }}>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.map((row, index) => (
              <TableRow key={index} style={BookingComponentStyles.rowStyle(index)}>
                <TableCell style={BookingComponentStyles.bodyCell}>{row.name}</TableCell>
                <TableCell style={BookingComponentStyles.bodyCell}>{row.reservationDate}</TableCell>
                <TableCell style={BookingComponentStyles.bodyCell}>{row.time}</TableCell>
                <TableCell style={BookingComponentStyles.bodyCell}>{row.meetingRoomName}</TableCell>
                <TableCell style={BookingComponentStyles.bodyCell}>{row.typeOfPriority}</TableCell>
                <TableCell style={BookingComponentStyles.getStatusStyle(row.status)}>{row.status}</TableCell>
              </TableRow>
            ))}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Loading more...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BookingComponent;
