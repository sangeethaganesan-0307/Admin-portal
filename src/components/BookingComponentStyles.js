const BookingComponentStyles = {
    pageContainer: {
      width: "1440px",
      height: "1024px",
      position: "relative",
      backgroundColor: "#F1F1F1",
      opacity: 1,
      gap: 0,
      display: "flex",
      flexDirection: "column",
    },
    tableWrapper: {
      margin: "20px",
      position: "relative",
    },
    scrollableContainer: {
      maxHeight: "205px",
      overflowY: "auto",
      width: "100%",
    },
    scrollableStyles: {
      maxHeight: "164px",
      overflowY: "auto",
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#888",
        borderRadius: "3px",
      },
    },
    headerStyles: {
      backgroundColor: "#111827",
      position: "sticky",
      top: 0,
      zIndex: 1,
    },
    tableContainer: {
      width: "100%",
      height: "205px",
      maxHeight: "270px",
      overflowY: "auto",
      backgroundColor: "#FFFFFF",
      borderRadius: "5px",
      border: "1px solid #F4F4F4",
      opacity: 1,
      gap: 0,
      marginTop: "10px",
    },
    tableHead: {
      position: "sticky",
      top: 0,
      width: "1193px",
      height: "41px",
      padding: "12px 15px",
      gap: "100px",
      borderRadius: "5px 5px 0px 0px",
      background: "#111827",
    },
    bodyCell: {
      fontFamily: "Inter",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "16.94px",
      textAlign: "left",
      color: "#5F5F5F",
      width: "auto",
      height: "17px",
      padding: "12px 15px",
    },
    rowStyle: (index) => ({
      width: "1193px",
      height: "41px",
      padding: "12px 15px",
      gap: "90px",
      backgroundColor: index % 2 === 0 ? "#EAFEFF" : "#FFFFFF",
      borderBottom: "1px solid #F4F4F4",
    }),
    getStatusStyle: (status) => ({
      fontFamily: "Inter",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "16.94px",
      textAlign: "left",
      padding: "12px 15px",
      color:
        status === "Confirmed" ? "green" :
        status === "Pending" ? "orange" : "red",
      fontWeight: 500,
    }),
  };
  
  export default BookingComponentStyles;
  