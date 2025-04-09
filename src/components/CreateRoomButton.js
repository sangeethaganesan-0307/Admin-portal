// import React, { useState } from 'react';
// import Button from '@mui/material/Button';

// const CreateRoomButton = () => {
//   return (
//     <Button
//       variant="contained"
//       sx={{
//         border: "1px solid black", // Correct way to apply border
//         color: "black",
//         backgroundColor: "white",
//       }}
//     >
//       Create Room
//     </Button>
//   );
// };

// export default CreateRoomButton;

// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import TextField from '@mui/material/TextField';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import Switch from '@mui/material/Switch';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import FormControl from '@mui/material/FormControl';

// const CreateRoomButton = () => {
//   const [open, setOpen] = useState(false);
//   const [roomData, setRoomData] = useState({
//     roomName: '',
//     amenities: '',
//     capacity: '',
//     externalDisplayAvailability: false,
//     isAvailable: false,
//     isAvailableForBooking: false,
//     approval: false,
//     allowRecurrence: false
//   });

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleChange = (event) => {
//     const { name, value, checked } = event.target;
//     if (name.includes('is') || name === 'externalDisplayAvailability' || name === 'approval' || name === 'allowRecurrence') {
//       setRoomData(prev => ({
//         ...prev,
//         [name]: checked
//       }));
//     } else {
//       setRoomData(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//   };

//   return (
//     <>
//       <Button
//         variant="contained"
//         onClick={handleClickOpen}
//         sx={{
//           border: "1px solid black",
//           color: "black",
//           backgroundColor: "white",
//           '&:hover': {
//             backgroundColor: '#f5f5f5'
//           }
//         }}
//       >
//         Create Room
//       </Button>

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{
//           sx: {
//             borderRadius: '4px',
//             '& .MuiDialogTitle-root': {
//               bgcolor: '#1a1e2c',
//               color: 'white',
//               p: 2
//             }
//           }
//         }}
//       >
//         <DialogTitle>
//           Create Room
//           <IconButton
//             aria-label="close"
//             onClick={handleClose}
//             sx={{
//               position: 'absolute',
//               right: 8,
//               top: 8,
//               color: 'white'
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>

//         <DialogContent sx={{ p: 3 }}>
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//             {/* Room Name */}
//             <Box>
//               <Typography variant="body2" sx={{ mb: 1 }}>Room Name</Typography>
//               <TextField
//                 fullWidth
//                 name="roomName"
//                 value={roomData.roomName}
//                 onChange={handleChange}
//                 size="small"
//                 variant="outlined"
//                 placeholder="Type"
//               />
//             </Box>

//             {/* Row 1: External Display and Amenities */}
//             <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, alignItems: 'center' }}>
//               <Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <Typography variant="body2">External Display availability</Typography>
//                   <Switch
//                     name="externalDisplayAvailability"
//                     checked={roomData.externalDisplayAvailability}
//                     onChange={handleChange}
//                     size="small"
//                   />
//                   <Typography variant="body2" color="text.secondary">
//                     {roomData.externalDisplayAvailability ? '' : 'No'}
//                   </Typography>
//                 </Box>
//               </Box>

//               <Box>
//                 <Typography variant="body2" sx={{ mb: 1 }}>Amenities</Typography>
//                 <FormControl fullWidth size="small">
//                   <Select
//                     value={roomData.amenities}
//                     onChange={handleChange}
//                     name="amenities"
//                     displayEmpty
//                     placeholder="Monitor and..."
//                   >
//                     <MenuItem value="">Monitor and...</MenuItem>
//                     <MenuItem value="monitor">Monitor</MenuItem>
//                     <MenuItem value="projector">Projector</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Box>

//               <Box>
//                 <Typography variant="body2" sx={{ mb: 1 }}>Capacity</Typography>
//                 <TextField
//                   fullWidth
//                   name="capacity"
//                   value={roomData.capacity}
//                   onChange={handleChange}
//                   size="small"
//                   variant="outlined"
//                   placeholder="1234"
//                   type="number"
//                 />
//               </Box>
//             </Box>

//             {/* Row 2: Switches */}
//             <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Typography variant="body2">Is Available</Typography>
//                 <Switch
//                   name="isAvailable"
//                   checked={roomData.isAvailable}
//                   onChange={handleChange}
//                   size="small"
//                 />
//                 <Typography variant="body2" color="text.secondary">
//                   {roomData.isAvailable ? '' : 'No'}
//                 </Typography>
//               </Box>

//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Typography variant="body2">Is Available for Booking</Typography>
//                 <Switch
//                   name="isAvailableForBooking"
//                   checked={roomData.isAvailableForBooking}
//                   onChange={handleChange}
//                   size="small"
//                 />
//                 <Typography variant="body2" color="text.secondary">
//                   {roomData.isAvailableForBooking ? '' : 'No'}
//                 </Typography>
//               </Box>

//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Typography variant="body2">Approval</Typography>
//                 <Switch
//                   name="approval"
//                   checked={roomData.approval}
//                   onChange={handleChange}
//                   size="small"
//                 />
//                 <Typography variant="body2" color="text.secondary">
//                   {roomData.approval ? '' : 'No'}
//                 </Typography>
//               </Box>

//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Typography variant="body2">Allow Recurrence</Typography>
//                 <Switch
//                   name="allowRecurrence"
//                   checked={roomData.allowRecurrence}
//                   onChange={handleChange}
//                   size="small"
//                 />
//                 <Typography variant="body2" color="text.secondary">
//                   {roomData.allowRecurrence ? '' : 'No'}
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
//         </DialogContent>

//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             sx={{
//               bgcolor: '#0066FF',
//               '&:hover': {
//                 bgcolor: '#0052CC'
//               }
//             }}
//           >
//             Create
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default CreateRoomButton;   

// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import TextField from '@mui/material/TextField';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import Switch from '@mui/material/Switch';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import FormControl from '@mui/material/FormControl';

// const CreateRoomButton = () => {
//   const [open, setOpen] = useState(false);
//   const [roomData, setRoomData] = useState({
//     roomName: '',
//     amenities: '',
//     capacity: '',
//     externalDisplayAvailability: false,
//     isAvailable: false,
//     isAvailableForBooking: false,
//     approval: false,
//     allowRecurrence: false
//   });

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleChange = (event) => {
//     const { name, value, checked } = event.target;
//     if (name.includes('is') || name === 'externalDisplayAvailability' || name === 'approval' || name === 'allowRecurrence') {
//       setRoomData(prev => ({
//         ...prev,
//         [name]: checked
//       }));
//     } else {
//       setRoomData(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//   };

//   return (
//     <>
//       <Button
//         variant="contained"
//         onClick={handleClickOpen}
//         sx={{
//           border: "1px solid black",
//           color: "black",
//           backgroundColor: "white",
//           '&:hover': {
//             backgroundColor: '#f5f5f5'
//           }
//         }}
//       >
//         Create Room
//       </Button>

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         maxWidth="md"
//         fullWidth
//         PaperProps={{
//           sx: {
//             borderRadius: '4px',
//             minHeight: '500px',
//             '& .MuiDialogTitle-root': {
//               bgcolor: '#1a1e2c',
//               color: 'white',
//               p: 2
//             }
//           }
//         }}
//       >
//         <DialogTitle>
//           Create Room
//           <IconButton
//             aria-label="close"
//             onClick={handleClose}
//             sx={{
//               position: 'absolute',
//               right: 8,
//               top: 8,
//               color: 'white'
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>

//         <DialogContent sx={{ p: 4 }}>
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
//             {/* Room Name */}
//             <Box>
//               <Typography variant="body2" sx={{ mb: 1 }}>Room Name</Typography>
//               <TextField
//                 fullWidth
//                 name="roomName"
//                 value={roomData.roomName}
//                 onChange={handleChange}
//                 size="small"
//                 variant="outlined"
//                 placeholder="Type"
//               />
//             </Box>

//             {/* Row 1: External Display, Amenities, and Capacity */}
//             <Box sx={{ 
//               display: 'grid', 
//               gridTemplateColumns: 'repeat(3, 1fr)', 
//               gap: 4,
//               alignItems: 'flex-start'
//             }}>
//               <Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <Typography variant="body2">External Display availability</Typography>
//                   <Switch
//                     name="externalDisplayAvailability"
//                     checked={roomData.externalDisplayAvailability}
//                     onChange={handleChange}
//                     size="small"
//                   />
//                   <Typography variant="body2" color="text.secondary">
//                     {roomData.externalDisplayAvailability ? '' : 'No'}
//                   </Typography>
//                 </Box>
//               </Box>

//               <Box>
//                 <Typography variant="body2" sx={{ mb: 1 }}>Amenities</Typography>
//                 <FormControl fullWidth size="small">
//                   <Select
//                     value={roomData.amenities}
//                     onChange={handleChange}
//                     name="amenities"
//                     displayEmpty
//                     placeholder="Monitor and..."
//                   >
//                     <MenuItem value="">Monitor and...</MenuItem>
//                     <MenuItem value="monitor">Monitor</MenuItem>
//                     <MenuItem value="projector">Projector</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Box>

//               <Box>
//                 <Typography variant="body2" sx={{ mb: 1 }}>Capacity</Typography>
//                 <TextField
//                   fullWidth
//                   name="capacity"
//                   value={roomData.capacity}
//                   onChange={handleChange}
//                   size="small"
//                   variant="outlined"
//                   placeholder="1234"
//                   type="number"
//                 />
//               </Box>
//             </Box>

//             {/* Row 2: Switches */}
//             <Box sx={{ 
//               display: 'grid', 
//               gridTemplateColumns: 'repeat(4, 1fr)', 
//               gap: 4,
//               mt: 2 
//             }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Typography variant="body2">Is Available</Typography>
//                 <Switch
//                   name="isAvailable"
//                   checked={roomData.isAvailable}
//                   onChange={handleChange}
//                   size="small"
//                 />
//                 <Typography variant="body2" color="text.secondary">
//                   {roomData.isAvailable ? '' : 'No'}
//                 </Typography>
//               </Box>

//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Typography variant="body2">Is Available for Booking</Typography>
//                 <Switch
//                   name="isAvailableForBooking"
//                   checked={roomData.isAvailableForBooking}
//                   onChange={handleChange}
//                   size="small"
//                 />
//                 <Typography variant="body2" color="text.secondary">
//                   {roomData.isAvailableForBooking ? '' : 'No'}
//                 </Typography>
//               </Box>

//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Typography variant="body2">Approval</Typography>
//                 <Switch
//                   name="approval"
//                   checked={roomData.approval}
//                   onChange={handleChange}
//                   size="small"
//                 />
//                 <Typography variant="body2" color="text.secondary">
//                   {roomData.approval ? '' : 'No'}
//                 </Typography>
//               </Box>

//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Typography variant="body2">Allow Recurrence</Typography>
//                 <Switch
//                   name="allowRecurrence"
//                   checked={roomData.allowRecurrence}
//                   onChange={handleChange}
//                   size="small"
//                 />
//                 <Typography variant="body2" color="text.secondary">
//                   {roomData.allowRecurrence ? '' : 'No'}
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
//         </DialogContent>

//         <DialogActions sx={{ p: 3 }}>
//           <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             sx={{
//               bgcolor: '#0066FF',
//               '&:hover': {
//                 bgcolor: '#0052CC'
//               }
//             }}
//           >
//             Create
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default CreateRoomButton;


import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CreateRoomButton = () => {
  const [open, setOpen] = useState(false);
  const [roomData, setRoomData] = useState({
    roomName: '',
    amenities: '',
    capacity: '',
    externalDisplayAvailability: false,
    isAvailable: false,
    isAvailableForBooking: false,
    approval: false,
    allowRecurrence: false
  });

  const handleChange = (name, value) => {
    setRoomData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}
      sx={{
                border: "1px solid black", // Correct way to apply border
                color: "black",
                backgroundColor: "white",
                marginLeft: "20px"
              }}
            
        >
        Create Room
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        

<DialogTitle
  sx={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    bgcolor: 'Black', // Replace this with the exact color from your image
    color: 'white' 
  }}
>
  Create Room
  <IconButton edge="end" color="inherit" onClick={() => setOpen(false)}>
    <CloseIcon />
  </IconButton>
</DialogTitle>

        <DialogContent dividers>
          {/* Room Name - Full Width */}
          <TextField
            fullWidth
            label="Room Name"
            variant="outlined"
            margin="normal"
            value={roomData.roomName}
            onChange={e => handleChange('roomName', e.target.value)}
          />

          {/* External Display Availability, Amenities, Capacity in One Row */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <FormControlLabel
              control={<Switch checked={roomData.externalDisplayAvailability} onChange={e => handleChange('externalDisplayAvailability', e.target.checked)} />}
              label="External Display availability"
              style={{ flex: 1 }}
            />

            <FormControl fullWidth style={{ flex: 1 }}>
              <InputLabel>Amenities</InputLabel>
              <Select
                value={roomData.amenities}
                onChange={e => handleChange('amenities', e.target.value)}
                label="Amenities"
              >
                <MenuItem value="monitor">Monitor</MenuItem>
                <MenuItem value="projector">Projector</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              type="number"
              label="Capacity"
              variant="outlined"
              value={roomData.capacity}
              onChange={e => handleChange('capacity', e.target.value)}
              style={{ flex: 1 }}
            />
          </div>

          {/* Row with Is Available, Is Available for Booking, Approval, Allow Recurrence */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <FormControlLabel
              control={<Switch checked={roomData.isAvailable} onChange={e => handleChange('isAvailable', e.target.checked)} />}
              label="Is Available"
            />
            <FormControlLabel
              control={<Switch checked={roomData.isAvailableForBooking} onChange={e => handleChange('isAvailableForBooking', e.target.checked)} />}
              label="Is Available for Booking"
            />
            <FormControlLabel
              control={<Switch checked={roomData.approval} onChange={e => handleChange('approval', e.target.checked)} />}
              label="Approval"
            />
            <FormControlLabel
              control={<Switch checked={roomData.allowRecurrence} onChange={e => handleChange('allowRecurrence', e.target.checked)} />}
              label="Allow Recurrence"
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateRoomButton;
