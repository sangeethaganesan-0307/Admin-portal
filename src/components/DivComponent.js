import React from "react";
import { Box } from "@mui/material";
import { styles } from "./DivComponentStyles";

const DivComponent = ({ children }) => {
  // Properly separate and identify children
  let sidebar = null;
  let navigation = null;
  let content = null;

  // Handle children as an array or single element
  if (Array.isArray(children)) {
    // If children is an array, extract components in correct order
    [sidebar, navigation, ...content] = children;
  } else {
    // If there's only one child, assume it's the sidebar
    sidebar = children;
  }

  return (
    <Box sx={styles.root}>
      {/* Outer Sidebar Container */}
      <Box sx={styles.sidebar}>
        {/* Inner Sidebar Container */}
        <Box sx={styles.innerSidebar}>
          {/* Text/Menu Container */}
          <Box sx={styles.textMenuContainer}>
            {sidebar}
          </Box>
        </Box>
      </Box>

      {/* Main Content Container */}
      <Box sx={styles.mainContent}>
        {/* Navigation Bar */}
        <Box sx={styles.navigationBar}>
          {navigation}
        </Box>

        {/* Content Area */}
        <Box sx={styles.contentArea}>
          {content && (
            <>
              {Array.isArray(content) ? content : null}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DivComponent;