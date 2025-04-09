// import { Height } from "@mui/icons-material";

const styles = {
  drawer: {
    width: '180px',
    '& .MuiDrawer-paper': {
      height: '1024px',
      padding: '15px 15px 49px 15px',
      backgroundColor: '#111827',
    },
  },
  mainContainer: {
    width: '173px',
    display: 'flex',
    alignItems: 'center',
    mb: 2,
  },
  logoContainer: {
    width: '173px',
    height: '72px',
    padding: '10px 0px 0px 0px',
    gap: '8px',
    display: 'flex',
  },
  innerLogoContainer: {
    width: '152px',
    height: '52px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: '10px',
    top: '10px',
  },
  image: {
    width: "152px",
    height: "52px",
  },
  sectionContainer: {
    width: '173px',
    height: '868px',
  },
  generalText: {
    width: '61px',
    height: '19px',
    fontFamily: 'Inter',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '19.36px',
    color: '#FFFFFF',
    mb: 2,
  },
  bookMeetingAdminContainer: {
    width: '173px',
    height: '113px',
    gap: '5px',
  },
  bookMeetingButton: {
    width: '173px',
    height: '54px',
    padding: '10px 16px',
    borderRadius: '4px 4px 4px 4px',
    background: 'linear-gradient(90deg, #E712FC 0%, #5E8AEB 53%, #07D5DF 100%)',
    gap: '8px',
  },
  adminButton: {
    width: '173px',
    height: '54px',
    padding: '10px 16px',
    borderRadius: '4px 0px 0px 0px',
  },
  helpSettingsContainer: {
    width: '157px',
    height: '142px',
    gap: '10px',
    position: 'relative',
    top: '40px',
  },
  helpSettingsBox: {
    width: '157px',
    height: '113px',
    gap: '5px',
  },
  helpButton: {
    width: '157px',
    height: '54px',
    padding: '10px 16px',
    borderRadius: '6px 0px 0px 0px',
    mb: 1,
  },
  settingsButton: {
    width: '157px',
    height: '54px',
    padding: '10px 16px',
    borderRadius: '6px 0px 0px 0px',
  },

  listItemIcon: {
    minWidth: '34px',
    '& .MuiSvgIcon-root': {
      width: '18px',
      height: '18px',
      color: '#FFFFFF',
    },
  },

  menuText: {
    '& .MuiTypography-root': {
      fontFamily: 'Inter',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '16.94px',
      color: '#FFFFFF',
    },
  },

  adminShowButtons: {
    width: '173px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    mt: 2,
  },
  createLocationButton: {
    width: '173px',
    height: '50px',
    padding: '10px 16px',
    borderRadius: '4px',
    backgroundColor: '#1E3A8A', // Deep blue color
    '&:hover': {
      backgroundColor: '#3B82F6', // Lighter blue on hover
    },
  },
  createRoomButton: {
    width: '173px',
    height: '50px',
    padding: '10px 16px',
    borderRadius: '4px',
    backgroundColor: '#064E3B', // Dark green color
    '&:hover': {
      backgroundColor: '#10B981', // Lighter green on hover
    },
  },

  // Modal Styles
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: 500,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 24,
    p: 0,
    outline: 'none',
    height: "450px"
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    bgcolor: '#1A202C',
    color: 'white',
    p: 2,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    width: "556px",
  },
  modalBody: {
    p: 3,
    width: "540px",
    backgroundColor: "white"
  },
  nameandShortNameBox: {
    display: "flex",
    gap: "12px",
  },
  nameBox: {
    width: "200px",
    height: "62px",
    top: "237px",
    left: "298px"
  },
  nameText: {
    mb: 1,
    widht: "200px",
    height: "16px"
  },
  nameTextField: {
    mb: 2,
    width: "200px",
    height: "40px",
    borderRadius: "4px",
    padding: "12px",
    gap: "10px"
  },
  shortNameBox: {
    width: "246px",
    height: "62px",
    top: "237px",
    left: "524px"
  },
  shortNameText: {
    mb: 1,
    widht: "246px",
    height: "16px",
    lineHeight: "15.73px"
  },
  shortNameTextField: {
    mb: 2,
    width: "246px",
    height: "40px",
    borderRadius: "4px",
    padding: "12px",
    gap: "10px"
  },
  timeBox: {
    display: 'flex',
    gridTemplateColumns: '1fr 1fr',
    gap: 2,
    mb: 2
  },
  bookingWindowBox: {
    width: "170px",
    height: "62px",
    top: "336px",
    left: "298px",
    gap: "6px"
  },
  bookingText: {
    mb: 1,
    width: "170px",
    height: "16px",
    size: "13px",
    lineHeight: "15.73px",
    marginTop: "30px"
  },
  bookingTextField: {
    width: "170px",
    height: "40px",
    borderRadius: "4px",
    padding: "12px",
    gap: "10px"
  },
  durationBox: {
    width: "170px",
    height: "62px",
    top: "400px"
  },
  durationText: {
    mb: 1,
    width: "170px",
    height: "16px",
    size: "13px",
    lineHeight: "15.73px",
    marginTop: "30px"
  },
  durationTextField: {
    width: "170px",
    height: "40px",
    borderRadius: "4px",
    padding: "12px"
  },
  recurrenceBox: {
    width: "170px",
    height: "62px",
    top: "336px",
    left: "298px"
  },
  recurrenceText: {
    mb: 1,
    width: "170px",
    height: "16px",
    size: "13px",
    lineHeight: "15.73px",
    marginTop: "30px"
  },
  recurrenceTextField: {
    width: "170px",
    height: "40px",
    borderRadius: "4px",
    padding: "12px",
  },
  adminActiveBox: {
    display: 'flex',
    //gridTemplateColumns: '1fr 1fr',
    gap: 2,
    left: "298px"
  },
  adminUserBox: {
    width: "170px",
    height: "62px",
    top: "336px",
    marginLeft: "23px",
    gap: "6px"
  },
  adminUserText: {
    mb: 1,
    width: "170px",
    height: "16px",
    lineHeight: "15.73px",
    marginTop: "30px"
  },
  adminUserTextField: {
    mb: 2,
    widht: "170px",
    height: "40px",
    borderRadius: "4px",
    padding: "12px",
    gap: "10px",
  },
  activeBox: {
    width: "170px",
    height: "52px",
    top: "346px",
    left: "524px",
    gap: "16px"
  },
  activeText: {
    mb: 1,
    width: "170px",
    height: "16px",
    lineHeight: "15.73px",
    marginTop: "30px",
    size: "13px"
  },
  activeToggle: {
    display: 'flex',
    alignItems: 'center',
    width: "64px",
    height: "20px",
    gap: "10px"
  },
  noText: {
    ml: 1,
    width: "18px",
    height: "18px",
    lineHeight: "18px",
    size: "13px"
  },
  cancelCreateBox: {
    display: 'flex',
    width: "237px",
    height: "41px",
    marginLeft: "330px",
    mt: 3,
    gap: "23px",
    marginTop: "40px"
  },
  cancelBox: {
    width: "107px",
    height: "41px", borderRadius: "4px",
    padding: "12px,14px,12px,14px",
    gap: "8px"
  },
  cancelButton: {
    widht: "48px",
    Height: "17px",
    size: "14px",
    leneheight: "100%"
  },
  crearteBox: {
    width: "107px",
    height: "51px",
    borderRadius: "4px",
    padding: "12px,14px,12px,14px",
    gap: "8px"
  },
  createButton: {
    width: "46px",
    height: "17px",
    size: "14px",
    lineheight: "100%",
    colors: "#FFFFFF",
    bgcolor: '#3182CE',
    textTransform: 'none',
    '&:hover': {
      bgcolor: '#2B6CB0',
    }
  },
  //room modal styles
  roomModalContainer:{
    position: 'absolute',
          top: "244px",
          left: "600px",
          transform: 'translate(-50%, -50%)',
          width: "930px",
          height: "489px",
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          p: 0,
          outline: 'none',
  },
  roomModalHeader:{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    bgcolor: '#1A202C',
    color: 'white',
    width:"900px",
    height:"44px",
    p: 2,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  headerContent:{
    width: "127px",
    height: "24px",
    top: "168px",
    left: "255px",
  },
  roomModalBody:{

  }

  }
export default styles;

