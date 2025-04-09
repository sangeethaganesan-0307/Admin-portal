export const styles = {
    root: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f4f4f4",
    },
    sidebar: {
      width: "170px",
      height: "1024px",
      padding: "15px 15px 49px 15px",
      position: "fixed",
      left: 0,
      top: 0,
      zIndex: 1200,
      backgroundColor: "#111827",
      borderRight: "1px solid #F4F4F4",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    innerSidebar: {
      width: "173px",
      height: "868px",
      display: "flex",
      flexDirection: "column",
      gap: "240px",
    },
    textMenuContainer: {
      width: "173px",
      height: "299px",
      gap: "15px",
      display: "flex",
      flexDirection: "column",
    },
    mainContent: {
      flexGrow: 1,
      marginLeft: "203px", // Match sidebar width
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },
    navigationBar: {
      position: "sticky",
      top: 0,
      zIndex: 1100,
      width: "100%",
    },
    contentArea: {
      flexGrow: 1,
      padding: "24px",
      backgroundColor: "#f4f4f4",
      height: "calc(100vh - 64px)", // Subtract navbar height
      overflowY: "auto",
    },
  };
  