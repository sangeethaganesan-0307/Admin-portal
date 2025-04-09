import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CreateLocationButton = () => {
  const [open, setOpen] = useState(false);
  const [locationData, setLocationData] = useState({
    locationName: '',
    shortName: '',
    adminUsers: '',
    isActive: false,
    bookingAllowedWindowInDays: '',
    noticeDurationToBookInMin: '15', // Set default to 15
    recurrenceCountAllowed: '15'  // Set default to 15
  });

  const maxValues = {
    bookingAllowedWindowInDays: 60,
    noticeDurationToBookInMin: 15,
    recurrenceCountAllowed: 15
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    if (name === 'isActive') {
      setLocationData(prevData => ({
        ...prevData,
        [name]: checked
      }));
    } else if (name === 'noticeDurationToBookInMin' || name === 'recurrenceCountAllowed') {
      // Force these fields to always be 15
      setLocationData(prevData => ({
        ...prevData,
        [name]: '15'
      }));
    } else if (name === 'bookingAllowedWindowInDays') {
      // Only booking window keeps the original validation
      const numValue = value === '' ? '' : Number(value);
      if (numValue === '' || (numValue <= maxValues[name] && numValue >= 0)) {
        setLocationData(prevData => ({
          ...prevData,
          [name]: numValue
        }));
      }
    } else {
      setLocationData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleCreate = () => {
    console.log('Creating location:', locationData);
    handleClose();
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Create New Location
      </Button>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '4px',
            '& .MuiDialogTitle-root': {
              bgcolor: '#1a1e2c',
              color: 'white',
              p: 2
            }
          }
        }}
      >
        <DialogTitle>
          Create Location
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white'
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>Location Name</Typography>
              <TextField
                fullWidth
                name="locationName"
                value={locationData.locationName}
                onChange={handleChange}
                size="small"
                variant="outlined"
                InputProps={{
                  placeholder: 'Type'
                }}
              />
            </Box>

            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>Short name ( Olympia Tech Park - OTP )</Typography>
              <TextField
                fullWidth
                name="shortName"
                value={locationData.shortName}
                onChange={handleChange}
                size="small"
                variant="outlined"
                InputProps={{
                  placeholder: 'Type'
                }}
              />
            </Box>

            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>Admin Users</Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={locationData.adminUsers}
                  onChange={handleChange}
                  name="adminUsers"
                  displayEmpty
                  renderValue={value => value || "Select"}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value="admin1">Admin 1</MenuItem>
                  <MenuItem value="admin2">Admin 2</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ mr: 2 }}>Is Active</Typography>
              <Switch
                checked={locationData.isActive}
                onChange={handleChange}
                name="isActive"
                size="small"
              />
              {!locationData.isActive && 
                <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                  No
                </Typography>
              }
            </Box>

            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>Booking Window (Days)</Typography>
              <TextField
                fullWidth
                name="bookingAllowedWindowInDays"
                value={locationData.bookingAllowedWindowInDays}
                onChange={handleChange}
                size="small"
                variant="outlined"
                type="number"
                InputProps={{
                  placeholder: '60',
                  inputProps: { min: 0, max: 60 }
                }}
                helperText={`Maximum: ${maxValues.bookingAllowedWindowInDays} days`}
              />
            </Box>

            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>Notice Duration (Minutes)</Typography>
              <TextField
                fullWidth
                name="noticeDurationToBookInMin"
                value={locationData.noticeDurationToBookInMin}
                onChange={handleChange}
                size="small"
                variant="outlined"
                type="number"
                InputProps={{
                  placeholder: '15',
                  inputProps: { min: 15, max: 15 }
                }}
                helperText="Value must be 15 minutes"
                disabled
              />
            </Box>

            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>Recurrence Count</Typography>
              <TextField
                fullWidth
                name="recurrenceCountAllowed"
                value={locationData.recurrenceCountAllowed}
                onChange={handleChange}
                size="small"
                variant="outlined"
                type="number"
                InputProps={{
                  placeholder: '15',
                  inputProps: { min: 15, max: 15 }
                }}
                helperText="Value must be 15 times"
                disabled
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreate} 
            variant="contained" 
            sx={{ 
              bgcolor: '#0066FF',
              '&:hover': {
                bgcolor: '#0052CC'
              }
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateLocationButton;
