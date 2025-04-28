import React, { useState, useEffect } from "react";
import "../TeamsCalendar.css";
import { Repeat } from "@mui/icons-material";
// Importing required MUI components from Sidebar.js
import { Modal, Button, TextField, Select, MenuItem, Switch, Typography, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PeopleIcon from '@mui/icons-material/People';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 20; hour++) { // Changed to 8 PM (20:00)
    const hourStr = hour > 12 ? `${hour - 12}` : `${hour}`;
    const period = hour >= 12 ? 'PM' : 'AM';
    slots.push(`${hourStr}:00 ${period}`);
    slots.push(`${hourStr}:30 ${period}`);
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const TeamsCalendar = ({ userRole = "user" }) => {
  const today = new Date().toISOString().split('T')[0];
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState({});
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("ChennaiOTP");
  const [selectedDate, setSelectedDate] = useState(today);
  const [editingBooking, setEditingBooking] = useState(null);
  const [showRoomEditForm, setShowRoomEditForm] = useState(false);
  const [selectedRoomForEdit, setSelectedRoomForEdit] = useState(null);
  const [pendingBookings, setPendingBookings] = useState({});
  // New state for Create Room modal from Sidebar.js
  const [openRoomModal, setOpenRoomModal] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [amenities, setAmenities] = useState('');
  const [capacity, setCapacity] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [isAvailableForBooking, setIsAvailableForBooking] = useState(false);
  const [requiresApproval, setRequiresApproval] = useState(false);
  const [allowRecurrence, setAllowRecurrence] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const isAdmin = userRole === "admin" || userRole === "superadmin";
//   const isAdmin = userRole === "admin" || userRole === "superadmin";
// console.log("userRole:", userRole, "isAdmin:", isAdmin);



// Add debugging
// console.log('Current userRole:', userRole);
// console.log('isAdmin:', isAdmin);
  useEffect(() => {
    fetchRoomsData();
    fetchBookings();
  }, []);

  useEffect(() => {
    initializeBookings();
    fetchBookings();
  }, []);

  useEffect(() => {
    fetchBookings();
    fetchPendingBookings();
  }, [selectedDate]);

  useEffect(() => {
    fetchRoomsData();
  }, [selectedLocation]);

  const fetchPendingBookings = () => {
    try {
      const storedPending = localStorage.getItem('pendingBookings');
      setPendingBookings(storedPending ? JSON.parse(storedPending) : {});
    } catch (error) {
      console.error("Error fetching pending bookings:", error);
      setPendingBookings({});
    }
  };

  const fetchRoomsData = async () => {
    try {
      const response = await fetch('/api/rooms.json');
      const roomsData = await response.json();
      const locationRooms = roomsData[selectedLocation]?.rooms || [];
      setRooms(locationRooms);
      setFilteredRooms(locationRooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setRooms([]);
      setFilteredRooms([]);
    }
  };

  // const fetchBookings = () => {
  //   try {
  //     const storedBookings = localStorage.getItem('bookings');
  //     if (!storedBookings) {
  //       setBookings({});
  //       return;
  //     }
  
  //     const data = JSON.parse(storedBookings);
  //     if (typeof data !== 'object' || data === null) {
  //       console.warn("Invalid bookings data in localStorage.");
  //       setBookings({});
  //       return;
  //     }
  
  //     // Get today's date in YYYY-MM-DD format
  //     const today = new Date().toISOString().split('T')[0];
  
  //     // Ignore past dates
  //     if (!selectedDate || selectedDate < today) {
  //       setBookings({});
  //       return;
  //     }
  
  //     const dateBookings = data[selectedDate] ?? {};
  //     // Filter only active bookings
  //     const activeBookings = Object.fromEntries(
  //       Object.entries(dateBookings).filter(([_, booking]) => booking?.status === 'active')
  //     );
  
  //     setBookings(activeBookings);
  //   } catch (error) {
  //     console.error("Error fetching bookings:", error);
  //     setBookings({});
  //   }
  // };

  const fetchBookings = () => {
    try {
      const storedBookings = localStorage.getItem('bookings') || '{}';
      const storedPending = localStorage.getItem('pendingBookings') || '{}';
  
      const allBookings = JSON.parse(storedBookings);
      const pending = JSON.parse(storedPending);
  
      const today = new Date().toISOString().split('T')[0];
      if (!selectedDate || selectedDate < today) {
        setBookings({});
        return;
      }
  
      const activeBookings = allBookings[selectedDate] || {};
      const pendingBookings = pending[selectedDate] || {};
  
      // Merge both
      const merged = {
        ...activeBookings,
        ...pendingBookings
      };
  
      setBookings(merged);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings({});
    }
  };
  
  
// Add this function to initialize the bookings data
const initializeBookings = () => {
  const initialBookings = {
    "rooms": [
      {
        "id": "maddison-square",
        "name": "Maddison Square",
        "capacity": 20,
        "facilities": ["tv", "wifi", "projector"]
      },
      {
        "id": "st-andrews",
        "name": "ST. Andrews",
        "capacity": 20,
        "facilities": ["tv", "wifi", "projector"]
      },
      {
        "id": "adelaide-oval",
        "name": "Adelaide Oval",
        "capacity": 20,
        "facilities": ["tv", "wifi", "projector"]
      }
    ],
    "bookings": {
      "2025-02-17": {
        "maddison-square-9:00 AM": {
          "title": "Yearly Sales Meeting",
          "description": "Annual sales review and planning",
          "duration": "2h",
          "status": "active"
        },
        "st-andrews-12:00 PM": {
          "title": "Annual Review",
          "description": "Department annual review",
          "duration": "2h",
          "status": "active"
        }
      }
    }
  };
  // Save to a JSON file (in a real application, this would be handled by the backend)
  const jsonString = JSON.stringify(initialBookings, null, 2);
  // In a real application, you would use an API endpoint to save this
  console.log('Booking data to be saved:', jsonString);

  if (!localStorage.getItem('bookings')) {
    localStorage.setItem('bookings', JSON.stringify(initialBookings.bookings));
  }
};

  const handleLocationFilter = async (location) => {
    setSelectedLocation(location);
    try {
      const response = await fetch('/api/rooms.json');
      const roomsData = await response.json();
      const locationRooms = roomsData[location]?.rooms || [];
      setRooms(locationRooms);
      filterRooms(location, selectedFilter === "Capacity" ? "capacity" : null);
    } catch (error) {
      console.error("Error fetching rooms for location:", error);
      setRooms([]);
    }
  };

const handleDateFilter = (date) => {
  if (date < today) {
    alert("Cannot select a past date.");
    return;
  }
  setSelectedDate(date);
};

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    if (filter === "All") {
      filterRooms(selectedLocation, null);
    } else if (filter === "Capacity") {
      filterRooms(selectedLocation, "capacity");
    }
  };

  const handleCapacityFilter = (capacity) => {
    const filtered = rooms
      .filter(room => (!selectedLocation || room.location === selectedLocation))
      .filter(room => room.capacity >= capacity);
    setFilteredRooms(filtered);
  };

  const filterRooms = (location, sortBy) => {
    let filtered = [...rooms];
    
    if (location) {
      filtered = filtered.filter(room => room.location === location);
    }
    
    if (sortBy === "capacity") {
      filtered.sort((a, b) => b.capacity - a.capacity);
    }
    
    setFilteredRooms(filtered);
  };

  
  const handleSlotClick = (room, time) => {
    const key = `${room.id}-${time}`;
    if (bookings[key] || pendingBookings[selectedDate]?.[key]) {
      setSelectedSlot({ room, time });
      setShowDeleteForm(true);
    } else {
      setSelectedSlot({ room, time });
      setShowBookingForm(true);
    }
  };
  
  // Add new handler for edit button
  const handleEditClick = (room, time, event = null) => {
    event.stopPropagation(); // Prevent the slot click event from firing
    const key = `${room.id}-${time}`;
    const booking = bookings[key];
    
    if (booking) {
      setSelectedSlot({ room, time });
      setEditingBooking({
        ...booking,
        roomId: room.id,
        time: time
      });
      setShowEditForm(true);
    }
  };

  const handleNewBooking = () => {
    setSelectedSlot(null);
    setShowBookingForm(true);
  };

const handleBookingSubmit = async (bookingData) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    if (bookingData.startDate < today) {
      alert("You cannot book a meeting room for a past date.");
      return;
    }

    // Get room ID from the selected room name
    const selectedRoom = rooms.find(r => r.name === bookingData.meetingRoom);
    if (!selectedRoom) {
      alert("Please select a valid meeting room");
      return;
    }

    // Convert 24-hour time format to 12-hour format for the key
    const convertTo12Hour = (time24) => {
      const [hours, minutes] = time24.split(':');
      const hour = parseInt(hours);
      const period = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${period}`;
    };

    const roomId = selectedSlot ? selectedSlot.room.id : selectedRoom.id;
      const startTime24 = bookingData.startTime;
      const endTime24 = bookingData.endTime;
      const startTime12 = convertTo12Hour(startTime24);
      const endTime12 = convertTo12Hour(endTime24);

    // Generate all time slots within the booking duration
    // const generateTimeSlots = (start, end) => {
    //   const slots = [];
    //   let current = new Date(`2024-01-01T${start}`);
    //   const endDate = new Date(`2024-01-01T${end}`);
    //   while (current <= endDate) {
    //     const hours = current.getHours();
    //     const minutes = current.getMinutes();
    //     const period = hours >= 12 ? 'PM' : 'AM';
    //     const hour12 = hours % 12 || 12;
    //     const timeSlot = `${hour12}:${minutes === 0 ? '00' : '30'} ${period}`;
    //     slots.push(timeSlot);
    //     current.setMinutes(current.getMinutes() + 30);
    //   }
    //   return slots;
    // };
const generateTimeSlots = (start, end) => {
  const slots = [];
  let current = new Date(`2024-01-01T${start}`);
  const endDate = new Date(`2024-01-01T${end}`);
  while (current < endDate) {
    const hours = current.getHours();
    const minutes = current.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    const timeSlot = `${hour12}:${minutes === 0 ? '00' : '30'} ${period}`;
    slots.push(timeSlot);
    current.setMinutes(current.getMinutes() + 30);
  }
  return slots;
};
    const timeSlots = generateTimeSlots(startTime24, endTime24);
    

    // Check if any slot is already booked
    const existingBookings = JSON.parse(localStorage.getItem('bookings')) || {};
    const pendingBookings = JSON.parse(localStorage.getItem('pendingBookings')) || {};
    const dateBookings = existingBookings[bookingData.startDate] || {};

    for (const time of timeSlots) {
      const key = `${roomId}-${time}`;
      if (dateBookings[key] || pendingBookings[bookingData.startDate]?.[key]) {
        alert("One or more time slots are already booked. Please select another time or room.");
        return;
      }
    }

    // Create the booking object
    // const newBooking = {
    //   title: bookingData.title,
    //   description: bookingData.description,
    //   date: bookingData.startDate,
    //   duration: bookingData.duration,
    //   status: 'active'
    // };
    // const newBooking = {
    //   title: bookingData.title,
    //   description: bookingData.description,
    //   date: bookingData.startDate,
    //   duration: bookingData.duration,
    //   startTime: startTime12,
    //   endTime: endTime12,
    //   roomId: roomId,
    //   status: 'active',
    //   createdAt: new Date().toISOString(),
    //   user: 'Current User'
    // };
    const newBooking = {
      title: bookingData.title,
      description: bookingData.description,
      date: bookingData.startDate,
      duration: bookingData.duration,
      startTime: startTime12,
      endTime: endTime12,
      roomId: roomId,
      status: 'pending', // ✅ FIXED
      createdAt: new Date().toISOString(),
      user: 'Current User'
    };

    // Save as pending booking
    if (!pendingBookings[bookingData.startDate]) {
      pendingBookings[bookingData.startDate] = {};
    }

    for (const time of timeSlots) {
      const key = `${roomId}-${time}`;
      pendingBookings[bookingData.startDate][key] = newBooking;
    }

    localStorage.setItem('pendingBookings', JSON.stringify(pendingBookings));

    setShowBookingForm(false);
    setSelectedSlot(null);

    // Don't update the main bookings until approved
    // fetchBookings will only show active bookings
    fetchBookings();
  // } catch (error) {
  //   console.error("Error saving booking:", error);
  //   alert("Failed to save booking. Please try again.");
  // }



    // Update localStorage for all time slots
    if (!existingBookings[bookingData.startDate]) {
      existingBookings[bookingData.startDate] = {};
    }

    for (const time of timeSlots) {
      const key = `${roomId}-${time}`;
      existingBookings[bookingData.startDate][key] = newBooking;
    }

    localStorage.setItem('bookings', JSON.stringify(existingBookings));

    // Update local state
    setBookings(prevBookings => {
      const updatedBookings = { ...prevBookings };
      for (const time of timeSlots) {
        const key = `${roomId}-${time}`;
        updatedBookings[key] = newBooking;
      }
      return updatedBookings;
    });

    setShowBookingForm(false);
    setSelectedSlot(null);

    // Refresh bookings
    fetchBookings();
  } catch (error) {
    console.error("Error saving booking:", error);
    alert("Failed to save booking. Please try again.");
  }
};

// Add handle edit submit function
const handleEditSubmit = async (bookingData) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    if (bookingData.date < today) {
      alert("You cannot edit a meeting room for a past date.");
      return;
    }
    
    const roomId = bookingData.roomId;
    const time = bookingData.time;
    const key = `${roomId}-${time}`;
    
    // Get current bookings
    const existingBookings = JSON.parse(localStorage.getItem('bookings')) || {};
    
    // If date is changing, handle the transfer
    if (bookingData.date !== selectedDate) {
      // Remove from old date
      if (existingBookings[selectedDate] && existingBookings[selectedDate][key]) {
        delete existingBookings[selectedDate][key];
      }
      
      // Ensure new date exists
      if (!existingBookings[bookingData.date]) {
        existingBookings[bookingData.date] = {};
      }
    }
    
    // Update the booking data
    const updatedBooking = {
      title: bookingData.title,
      description: bookingData.description,
      date: bookingData.date,
      duration: bookingData.duration,
      status: 'active'
    };
    
    // Save to localStorage
    existingBookings[bookingData.date][key] = updatedBooking;
    localStorage.setItem('bookings', JSON.stringify(existingBookings));
    
    // Update local state
    setBookings((prevBookings) => {
      const updatedBookings = { ...prevBookings };
      if (bookingData.date === selectedDate) {
        updatedBookings[key] = updatedBooking;
      } else {
        delete updatedBookings[key];
      }
      return updatedBookings;
    });
    
    setShowEditForm(false);
    setSelectedSlot(null);
    setEditingBooking(null);
    
    // Refresh bookings
    fetchBookings();
  } catch (error) {
    console.error("Error updating booking:", error);
    alert("Failed to update booking. Please try again.");
  }
};

const isTimeSlotBooked = (roomId, time) => {
  const key = `${roomId}-${time}`;
  return bookings[key] && bookings[key].status === 'active';
};

const handleBookingDelete = async (roomId, time) => {
  try {
    const key = `${roomId}-${time}`;
    
    // Get current bookings from localStorage
    const allBookings = JSON.parse(localStorage.getItem('bookings')) || {};
    
    // Get the booking to be deleted
    const bookingToDelete = allBookings[selectedDate][key];
    
    if (!bookingToDelete) {
      throw new Error('Booking not found');
    }

    // Initialize deleted_bookings structure if it doesn't exist
    if (!allBookings.deleted_bookings) {
      allBookings.deleted_bookings = {};
    }
    if (!allBookings.deleted_bookings[selectedDate]) {
      allBookings.deleted_bookings[selectedDate] = {};
    }

    // Move booking to deleted_bookings
    allBookings.deleted_bookings[selectedDate][key] = {
      ...bookingToDelete,
      status: 'deleted',
      deleted_at: new Date().toISOString()
    };

    // Remove from active bookings
    delete allBookings[selectedDate][key];

    // Save to localStorage
    localStorage.setItem('bookings', JSON.stringify(allBookings));

    // Update local state
    setBookings(prevBookings => {
      const updatedBookings = { ...prevBookings };
      delete updatedBookings[key];
      return updatedBookings;
    });

    setShowDeleteForm(false);
    setSelectedSlot(null);
    
    // Refresh bookings
    fetchBookings();
  } catch (error) {
    console.error("Error deleting booking:", error);
    alert("Failed to delete booking. Please try again.");
  }
};
const handleRoomUpdate = async (updatedRoomData) => {
  try {
    const updatedRooms = rooms.map(room =>
      room.id === updatedRoomData.id ? updatedRoomData : room
    );
    
    setRooms(updatedRooms);
    setFilteredRooms(updatedRooms);
    
    setShowRoomEditForm(false);
    setSelectedRoomForEdit(null);
  } catch (error) {
    console.error("Error updating room:", error);
    alert("Failed to update room. Please try again.");
  }
};

const EditRoomForm = ({ room, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    id: room.id,
    name: room.name,
    capacity: room.capacity,
    facilities: [...room.facilities]
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'capacity' ? parseInt(value) : value });
  };
  const handleFacilityToggle = (facility) => {
    const newFacilities = formData.facilities.includes(facility)
      ? formData.facilities.filter(f => f !== facility)
      : [...formData.facilities, facility];
    setFormData({ ...formData, facilities: newFacilities });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Edit Room Facilities: {room.name}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label>Capacity</label>
              <input
                type="number"
                className="form-input"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label>Facilities</label>
              <div className="facilities-checkboxes">
                {['wifi', 'tv', 'projector'].map(facility => (
                  <label key={facility} className="facility-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.facilities.includes(facility)}
                      onChange={() => handleFacilityToggle(facility)}
                    />
                    {facility === 'wifi' && 'WiFi 📶'}
                    {facility === 'tv' && 'TV 📺'}
                    {facility === 'projector' && 'Projector 📽️'}
                  </label>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-save">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

  // New function from Sidebar.js for handling number input
  const handleNumberInput = (setter) => (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value !== "") {
      setter(Number(value));
    }
  };

  // New function from Sidebar.js for handling room creation
  const handleCreateRoom = () => {
    const newRoom = {
      roomName,
      amenities,
      capacity,
      isAvailable,
      isAvailableForBooking,
      requiresApproval,
      allowRecurrence,
    };

    console.log("Sending request to create room...");
    setTimeout(() => {
      console.log("Fake API Response: Room created successfully!", newRoom);
      const fakeResponse = { 
        id: Date.now(), 
        name: roomName, 
        capacity, 
        facilities: amenities.split(',').map(f => f.trim()), // Convert amenities to array
        ...newRoom 
      };
      setRooms((prev) => [...prev, fakeResponse]); // Add to rooms state
      setFilteredRooms((prev) => [...prev, fakeResponse]); // Add to filtered rooms
      setSnackbar({
        open: true,
        message: "Room created successfully!",
        severity: "success",
      });
      setOpenRoomModal(false); // Close the modal
    }, 1000); // Simulate a 1-second network delay
  };

  // New function to close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  const BookingForm = ({ onSubmit, onClose,  }) => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      date: selectedDate,
      duration: '30m',
      roomId: '',
      startTime: '',
      endTime:'',
      Repeat:'',
      external:false,
      participantCount:'',
      meetingRoom:'',
      capacity:'',
      location:'',
      showRecurrence: false,
      recurrenceStatus: '', // Add this new field
      recurrenceStart: new Date().toISOString().split('T')[0],
      recurrenceFrequency: 1,
      recurrencePeriod: 'week',
      recurrenceDays: ['M', 'T', 'W', 'Th', 'F'],
      recurrenceEnd: ''
    });
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

  const handleToggle = () => {
    setFormData({
      ...formData,
      external: !formData.external
    });
  };

    const handleSubmit = (e) => {
      e.preventDefault();
    
      // Validation logic
    //   const requiredFields = ['title', 'description', 'startDate', 'startTime', 'endDate', 'endTime', 'location', 'meetingRoom', 'capacity', 'participantCount'];
    //   const emptyFields = requiredFields.filter(field => !formData[field]);
    
    //   if (emptyFields.length > 0) {
    //     alert(`Please fill out the following fields: ${emptyFields.join(', ')}`);
    //     return;
    //   }
    
    //   onSubmit(formData);
    // };
    if (!formData.title || !formData.description || !formData.startTime || !formData.endTime || !formData.meetingRoom) {
      alert("Please fill out all required fields.");
      return;
    }
    onSubmit(formData);
  };

    // Add these to your component
const toggleWeekday = (day) => {
  const currentDays = formData.recurrenceDays || [];
  let newDays;
  
  if (currentDays.includes(day)) {
    newDays = currentDays.filter(d => d !== day);
  } else {
    newDays = [...currentDays, day];
  }
  
  setFormData({...formData, recurrenceDays: newDays});
};

const handleToggleRecurrence = () => {
  // If recurrence is already set, turning off should clear recurrence data
  if (formData.isRecurrenceSet) {
    setFormData({
      ...formData,
      showRecurrence: false,
      isRecurrenceSet: false, // Turn off recurrence
      recurrenceStatus: '',
      // Reset recurrence data
      recurrenceStart: new Date().toISOString().split('T')[0],
      recurrenceFrequency: 1,
      recurrencePeriod: 'week',
      recurrenceDays: ['M', 'T', 'W', 'Th', 'F'],
      recurrenceEnd: ''
    });
  } else {
    // Normal toggle behavior when recurrence isn't set
    setFormData(prev => ({
      ...prev,
      showRecurrence: !prev.showRecurrence
    }));
  }
};

// Update the handleSaveRecurrence function
const handleSaveRecurrence = () => {
  // Validate recurrence data
  if (!formData.recurrenceStart || !formData.recurrenceEnd) {
    alert("Please select both start and end dates for recurrence");
    return;
  }

  if (formData.recurrenceDays.length === 0) {
    alert("Please select at least one day for recurrence");
    return;
  }
  const recurrenceData = {
    start: formData.recurrenceStart,
    frequency: formData.recurrenceFrequency,
    period: formData.recurrencePeriod,
    days: formData.recurrenceDays,
    end: formData.recurrenceEnd
  };

  const saveBooking = (bookingData) => {
    // Implement the logic to save the booking data
    console.log('Saving booking:', bookingData);
  };

  // Save the recurrence data to your booking data
  saveBooking({
    ...formData,
    recurrence: recurrenceData
  });

  // Update form data
  setFormData({
    ...formData,
    showRecurrence: false,
    isRecurrenceSet: true, // Add a flag to indicate recurrence is set
    recurrenceStatus: 'Recurrence saved' // Set the status message
  });

  // Clear success message after 3 seconds
  setTimeout(() => {
    setFormData(prevState => ({
        ...prevState,
        showRecurrence: false, // Keep panel closed
        isRecurrenceSet: true, // Keep recurrence set
        recurrenceStatus: '' // Clear only the status message
    }));
}, 3000);
};
useEffect(() => {
  
  if (selectedSlot && showBookingForm) {
    // const convertTimeFormat = (timeStr) => {
    //   const [time, period] = timeStr.split(' ');
    //   let [hours] = time.split(':');
    //   hours = parseInt(hours);
      
    //   if (period === 'PM' && hours !== 12) {
    //     hours += 12;
    //   } else if (period === 'AM' && hours === 12) {
    //     hours = 0;
    //   }
      
    //   // Calculate start and end times
    //   const startTime = `${hours.toString().padStart(2, '0')}:00`;
    //   const endDate = new Date(`2024-01-01T${startTime}`);
    //   endDate.setMinutes(endDate.getMinutes() + 30);
    //   const endTime = endDate.toTimeString().slice(0, 5);

    //   return { startTime, endTime };
    // };

    const convertTimeFormat = (timeStr) => {
      const [time, period] = timeStr.split(' ');
      let [hours, minutes] = time.split(':');
      hours = parseInt(hours);
      if (period === 'PM' && hours !== 12) hours += 12;
      else if (period === 'AM' && hours === 12) hours = 0;
      const startTime = `${hours.toString().padStart(2, '0')}:${minutes}`;
      const endDate = new Date(`2024-01-01T${startTime}`);
      endDate.setMinutes(endDate.getMinutes() + 30);
      const endTime = endDate.toTimeString().slice(0, 5);
      return { startTime, endTime };
    };

    const times = convertTimeFormat(selectedSlot.time);

    setFormData((prevFormData) => ({
      ...prevFormData,
      location: selectedLocation,
      meetingRoom: selectedSlot.room.name,
      capacity: selectedSlot.room.capacity,
      participantCount: '',
      title: bookings[`${selectedSlot.room.id}-${selectedSlot.time}`]?.title || '',
      description: bookings[`${selectedSlot.room.id}-${selectedSlot.time}`]?.description || '',
      startDate: selectedDate,
      // startTime: selectedSlot.time,
      // startTime: convertTimeFormat(selectedSlot.time), // Convert the time format
      startTime: times.startTime,
      endDate: selectedDate,
      // endTime: '',
      endTime: times.endTime, // Set the calculated end time
      date: selectedDate, // Pre-fill the date
      isViewMode: true, // Add a flag for view mode
    }));
  }
}, [selectedSlot, showBookingForm, selectedLocation, selectedDate, bookings]);

    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h3>New Meeting Room</h3>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>

          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              {/* First row - 4 columns */}
              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <select className="form-select" name="location" value={formData.location} onChange={handleChange} disabled={formData.isViewMode}>
                    <option value="">Select</option>
                    <option value="ChennaiOTP">Chennai OTP</option>
                    <option value="GC">Ganesh Chambers</option>
                    <option value="Bangalore">Bangalore</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Meeting Room</label>
                  <select className="form-select" name="meetingRoom" value={formData.meetingRoom} onChange={handleChange} disabled={formData.isViewMode}>
                    <option value="">Select</option>
                    {rooms.map((room) => (
                      <option key={room.id} value={room.name}>
                        {room.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Capacity</label>
                  <select className="form-select" name="capacity" value={formData.capacity} onChange={handleChange} disabled={formData.isViewMode}>
                    <option value="">Select</option>
                    {rooms.map((room) => (
                      <option key={room.id} value={room.capacity}>
                        {room.capacity}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Participant Count</label>
                  <input type="text" className="form-input" name="participantCount" value={formData.participantCount} onChange={handleChange} placeholder="Type" disabled={formData.isViewMode} />
                </div>
              </div>
        
        {/* Title - full width */}
              <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-input" name="title" value={formData.title} onChange={handleChange} placeholder="Type Here" />
              </div>
        
        {/* Date and Time row */}
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <div className="date-input-container">
                    <input type="date" className="form-input" name="startDate" value={formData.startDate} onChange={handleChange} disabled={formData.isViewMode} />
                    <span className="date-arrow"></span>
                  </div>
                </div>
        
                <div className="form-group">
                  <label>Start Time</label>
                  <div className="time-input-container">
                    {/* <input
                      type="time"
                      className="form-input"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      disabled={formData.isViewMode}
                    /> */}
                    <input
                    type="time"
                    className="form-input"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    min="09:00"
                    max="20:00"
                    step="1800"
                    disabled={formData.isViewMode}
                  />
                  </div>
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <div className="date-input-container">
                    <input type="date" className="form-input" name="endDate" value={formData.endDate} onChange={handleChange} disabled={formData.isViewMode} />
                    <span className="date-arrow"></span>
                  </div>
                </div>
         
                <div className="form-group">
                  <label>End Time</label>
                  <div className="time-input-container">
                    {/* <input
                      type="time"
                      className="form-input"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      disabled={formData.isViewMode}
                    /> */}
                    <input
                    type="time"
                    className="form-input"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    min="09:00"
                    max="20:30"
                    step="1800"
                    disabled={formData.isViewMode}
                  />
                  </div>
                </div>
                {/* <div className="duration-label">30m</div> */}
              </div>
        
        {/* Repeat and External toggle */}
              <div className="form-row">
                <div className="form-group">
                  <div className="repeat-container">
                    <label>Repeat</label>
                    <div className="toggle-and-status"></div>
                    <div className="toggle-container">
                      <div
                        className={`toggle-switch ${formData.isRecurrenceSet || formData.showRecurrence ? 'active' : ''}`}
                        onClick={handleToggleRecurrence}
                    // onClick={() => setFormData(prev => ({ 
                    //   ...prev, 
                    //   showRecurrence: !prev.showRecurrence 
                    // }))}
                      // className={`toggle-switch ${formData.showRecurrence ? 'active' : ''}`}
                      // onClick={() => setFormData({ ...formData, showRecurrence: !formData.showRecurrence })}
                    >
                        <div className="toggle-circle"></div>
                      </div>
                    </div>
                    {formData.recurrenceStatus && (
                      <span className="recurrence-status">{formData.recurrenceStatus}</span>
                    )}
                  </div>
     
                  <div className="form-group external-toggle">
                    <label>External</label>
                    <div className="toggle-container">
                      <div
                        className={`toggle-switch ${formData.external ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, external: !formData.external })}
                      >
                        <div className="toggle-circle"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recurrence panel that shows when repeat toggle is on */}
                {formData.showRecurrence && (
                  <div className="recurrence-panel">
                    <h4>Set recurrence</h4>

                    <div className="recurrence-row">
                      <label>Start</label>
                      <input
                        type="date"
                        className="form-input date-input"
                        name="recurrenceStart"
                        value={formData.recurrenceStart}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="recurrence-row">
                      <label>Repeat every</label>
                      <input
                        type="number"
                        className="form-input number-input"
                        name="recurrenceFrequency"
                        value={formData.recurrenceFrequency}
                        onChange={handleChange}
                        min="1"
                      />
                      <select
                        className="form-select period-select"
                        name="recurrencePeriod"
                        value={formData.recurrencePeriod}
                        onChange={handleChange}
                      >
                        <option value="day">Day</option>
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                      </select>
                    </div>

                    <div className="recurrence-row weekday-selector">
                    {['S', 'M', 'T', 'W', 'Th', 'F', 'S'].map(day => (
                        <div
                          key={day}
                          className={`weekday-circle ${formData.recurrenceDays?.includes(day) ? 'selected' : ''}`}
                          onClick={() => toggleWeekday(day)}
                        >
                          {day}
                        </div>
                      ))}
                      {/* <div className={`weekday-circle ${formData.recurrenceDays?.includes('S') ? 'selected' : ''}`} onClick={() => toggleWeekday('S')}>S</div>
                      <div className={`weekday-circle ${formData.recurrenceDays?.includes('M') ? 'selected' : ''}`} onClick={() => toggleWeekday('M')}>M</div>
                      <div className={`weekday-circle ${formData.recurrenceDays?.includes('T') ? 'selected' : ''}`} onClick={() => toggleWeekday('T')}>T</div>
                      <div className={`weekday-circle ${formData.recurrenceDays?.includes('W') ? 'selected' : ''}`} onClick={() => toggleWeekday('W')}>W</div>
                      <div className={`weekday-circle ${formData.recurrenceDays?.includes('Th') ? 'selected' : ''}`} onClick={() => toggleWeekday('Th')}>Th</div>
                      <div className={`weekday-circle ${formData.recurrenceDays?.includes('F') ? 'selected' : ''}`} onClick={() => toggleWeekday('F')}>F</div>
                      <div className={`weekday-circle ${formData.recurrenceDays?.includes('S') ? 'selected' : ''}`} onClick={() => toggleWeekday('S')}>S</div> */}
                    </div>

                    <div className="recurrence-row">
                      <label>End</label>
                      <input
                        type="date"
                        className="form-input date-input"
                        name="recurrenceEnd"
                        value={formData.recurrenceEnd}
                        onChange={handleChange}
                        placeholder="Select date"
                      />
                    </div>

                    <div className="recurrence-summary">
                      Occurs every {formData.recurrenceDays?.join(', ').replace(/, ([^,]*)$/, ' and $1')}
                    </div>
                    {/* //newly added */}
                    {formData.successMessage && (
                      <div className="success-message">
                        {formData.successMessage}
                      </div>
                    )}
                    <div className="recurrence-actions">
                      <button type="button" className="btn-cancel" onClick={() => setFormData({ ...formData, showRecurrence: false })}>Cancel</button>
                      <button type="button" className="btn-save" onClick={() => handleSaveRecurrence()}>Save</button>
                    </div>
                  </div>
                )}
              </div>
        
        {/* Description field */}
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-textarea" name="description" value={formData.description} onChange={handleChange} placeholder="Type Here" maxLength={500}></textarea>
                <div className="char-count">{formData.description ? formData.description.length : 0}/500</div>
              </div>
        
        {/* Footer buttons */}
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                {formData.isViewMode && (
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => setFormData({ ...formData, isViewMode: false })}
                  >
                    Edit
                  </button>
                )}
                <button type="submit" className="btn-save">Save</button>
              </div>
      </form>
    </div>
  </div>
</div>
    );
  };



  // this is the booked card in the calendar 
  const DeleteReservationForm = ({ onDelete, onClose }) => {
    const booking = bookings[`${selectedSlot?.room.id}-${selectedSlot?.time}`];

    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h3>Meeting Room Details</h3>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
          <div className="modal-content">
            <div className="form-group">
              <label>Title</label>
              <input type="text" className="form-input" value={booking?.title} disabled />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea className="form-textarea" value={booking?.description} disabled />
            </div>
            <div className="modal-footer">
              <button className="btn-delete" onClick={() => onDelete(selectedSlot?.room.id, selectedSlot?.time)}>
                Cancel Reservation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };


  //this is the calendar container with location and facilities
  return (
    <div className="calendar-container-with-specifications" style={{ display: 'block' }}>
      <div className="calendar-specifications-container">
        <select 
          className="location-select"
          value={selectedLocation}
          onChange={(e) => handleLocationFilter(e.target.value)}
        >
          <option value="ChennaiOTP">Chennai OTP</option>
          <option value="GC">Ganesh Chambers</option>
          <option value="Bangalore">Bangalore</option>
        </select>
        
        <input 
          type="date" 
          className="date-select"
          value={selectedDate}
          onChange={(e) => handleDateFilter(e.target.value)}
        />
        <button className="filter-btn" onClick={handleNewBooking}>
          New Booking
        </button>
      </div>
<div style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '36px' }}>
        <h2 className="selected-location-heading">
          {selectedLocation === "ChennaiOTP" ? "Chennai OTP" : 
           selectedLocation === "GC" ? "Ganesh Chambers" : "Bangalore"} Meeting Room List
        </h2>
        {isAdmin && (
          <Button 
            variant="contained" 
            onClick={() => setOpenRoomModal(true)}
            sx={{ 
              bgcolor: '#3182CE', 
              textTransform: 'none',
              '&:hover': { bgcolor: '#2B6CB0' },
              height: '36px'
            }}
          >
            Create Room
          </Button>
        )}
      </div>

      <div className="calendar-wrapper">
        <table className="calendar-table">
          <thead>
            <tr>
              <th className="time-header">Time</th>
              {filteredRooms.map(room => (
                <th key={room.id} className="room-header">
                  <div className="room-info">
                    <div className="room-name-container">
                      <div className="room-name">{room.name}</div>
                      {/* Temporarily remove isAdmin check for testing */}
                      <button
                        className="edit-room-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          console.log('Edit clicked for room:', room);
                          setSelectedRoomForEdit(room);
                          setShowRoomEditForm(true);
                        }}
                        title={`Edit ${room.name} facilities`}
                      >
                        Edit
                      </button>
                    
                    </div>
                    <div className="room-details">
                      <span className="capacity">👥 {room.capacity}</span>
                      {room.facilities.map((facility, index) => (
                        <span key={index} className="facility">
                          {facility === 'wifi' && '📶'}
                          {facility === 'tv' && '📺'}
                          {facility === 'projector' && '📽️'}
                        </span>
                      ))}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
<tbody>
            {timeSlots.map((time, index) => {
              const [hour] = time.split(':');
              const isHalfHour = time.includes(':30');
              return (
                <tr key={time} className="time-row">
                  {index % 2 === 0 && (
                    <td className="time-column" rowSpan={2}>{hour} {time.split(' ')[1]}</td>
                  )}
                  {filteredRooms.map(room => {
                    const slotKey = `${room.id}-${time}`;
                    const isPending = pendingBookings[selectedDate]?.[slotKey]?.status === 'pending';
                    const isBooked = bookings[slotKey]?.status === 'active';
                    const booking = bookings[slotKey] || pendingBookings[selectedDate]?.[slotKey];

                    return (
                      <td key={slotKey} className="time-slot-container">
                        <div
                          className={`time-slot-half ${isPending ? 'pending' : isBooked ? 'booked' : ''}`}
                          onClick={() => handleSlotClick(room, time)}
                          // style={{ height: isHalfHour ? '50%' : '100%' }}
                          style={{ height:  '100%' }}
                        >
                          {booking?.title || ''}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          {/* <tbody>
            {timeSlots.map((time) => (
              <tr key={time} className="time-row">
                <td className="time-column">{time}</td>
                
                {filteredRooms.map(room => (
                  <td key={`${room.id}-${time}`} className="time-slot-container">
                    <div
                      className={`time-slot-half ${
                        isTimeSlotBooked(room.id, `${time}`) || isTimeSlotBooked(room.id, `${time.split(':')[0]}:30 ${time.split(' ')[1]}`) ? 'booked' : ''
                      }`}
                      
                      onClick={() => handleSlotClick(room, time)}
                    >
                      {bookings[`${room.id}-${time}`]?.title || ''}
                    </div>
                    <div
                      className={`time-slot-half ${
                        isTimeSlotBooked(room.id, `${time.split(':')[0]}:30 ${time.split(' ')[1]}`) || isTimeSlotBooked(room.id, `${time}`) ? 'booked' : ''
                      }`}
                      onClick={() => handleSlotClick(room, `${time.split(':')[0]}:30 ${time.split(' ')[1]}`)}
                    >
                      {bookings[`${room.id}-${time.split(':')[0]}:30 ${time.split(' ')[1]}`]?.title || ''}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>

      {/* Modal forms */}
      {showBookingForm && (
        <BookingForm 
          onSubmit={handleBookingSubmit} 
          onClose={() => setShowBookingForm(false)} 
        />
      )}
      
      {showDeleteForm && (
        <DeleteReservationForm 
          onDelete={handleBookingDelete} 
          onClose={() => setShowDeleteForm(false)} 
        />
      )}
      {showRoomEditForm && selectedRoomForEdit && (
        <EditRoomForm
          room={selectedRoomForEdit}
          onSubmit={handleRoomUpdate}
          onClose={() => {
            setShowRoomEditForm(false);
            setSelectedRoomForEdit(null);
          }}
        />
      )}
      {/* New Create Room Modal from Sidebar.js */}
      <Modal open={openRoomModal} onClose={() => setOpenRoomModal(false)}>
        <Box sx={{
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
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: '#1A202C',
            color: 'white',
            width: "900px",
            height: "44px",
            p: 2,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
          }}>
            <Typography variant="h6" sx={{ height: "24px" }}>
              Create Room
            </Typography>
            <IconButton onClick={() => setOpenRoomModal(false)} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Box sx={{ p: 3, width: "844px", height: "275.52px", top: "237px", left: "298px", gap: "32px" }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>Room Name</Typography>
              <TextField 
                fullWidth 
                variant="outlined"
                placeholder="Type"
                size="small"
                sx={{ mb: 3 }}
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                required
              />
            </Box>
              
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr',
              gap: "40px", 
              mb: 2,
              width: "413px",
              height: "62px"
            }}>
              <Box sx={{ width: "173px", height: "62px" }}>
                <Typography variant="body2" sx={{ mb: 1 }}>Amenities</Typography>
                <Select
                  sx={{ width: "173px", height: "40px", borderRadius: "4px", border: "1px", padding: "12px", gap: "10px", backgroundColor: "#FFFFFF" }}
                  displayEmpty
                  variant="outlined"
                  value={amenities}
                  onChange={(e) => setAmenities(e.target.value)}
                  renderValue={(selected) => selected ? selected : "Monitor and..."}
                  size="small"
                >
                  <MenuItem value="Projector">Projector</MenuItem>
                  <MenuItem value="Whiteboard">Whiteboard</MenuItem>
                  <MenuItem value="Monitor">Monitor</MenuItem>
                  <MenuItem value="Monitor and Projector">Monitor and Projector</MenuItem>
                  <MenuItem value="Monitor and Whiteboard">Monitor and Whiteboard</MenuItem>
                </Select>
              </Box>

              <Box sx={{ width: "200px", height: "62px", left: "213px", gap: "6px" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography variant="body2" sx={{ lineHeight: "15.73px", mr: 1 }}>Capacity</Typography>
                  <PeopleIcon fontSize="small" />
                </Box>
                <TextField
                  sx={{ height: "40px", width: "200px", borderRadius: "4px", border: "1px", gap: "10px" }}
                  variant="outlined"
                  placeholder="1234"
                  size="small"
                  value={capacity}
                  onChange={handleNumberInput(setCapacity)}
                  inputProps={{ maxLength: 4, inputMode: 'numeric' }}
                />
              </Box>
            </Box>
              
            <Box sx={{ 
              display: 'flex', 
              gridTemplateColumns: '1fr 1fr',
              gap: 2, 
              mb: 2,
              width: "746px",
              height: "52px",
              gap: "22px"
            }}>
              <Box sx={{ width: "170px", height: "52px", gap: "16px" }}>
                <Typography variant="body2" sx={{ mb: 1, width: "170px", height: "16px", lineHeight: "15.73px" }}>Is Available</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', width: "64px", height: "20px", gap: "10px" }}>
                  <Switch 
                    checked={isAvailable}
                    onChange={(e) => setIsAvailable(e.target.checked)}
                  />
                  <Typography variant="body2" color="text.secondary">{isAvailable ? 'Yes' : 'No'}</Typography>
                </Box>
              </Box>
                
              <Box sx={{ width: "170px", height: "52px", gap: "16px" }}>
                <Typography variant="body2" sx={{ mb: 1, width: "170px", height: "16px", lineHeight: "15.73px" }}>Is Available for Booking</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', width: "64px", height: "20px", gap: "10px" }}>
                  <Switch 
                    checked={isAvailableForBooking}
                    onChange={(e) => setIsAvailableForBooking(e.target.checked)}
                  />
                  <Typography variant="body2" color="text.secondary">{isAvailableForBooking ? 'Yes' : 'No'}</Typography>
                </Box>
              </Box>
                
              <Box sx={{ width: "170px", height: "52px", gap: "16px" }}>
                <Typography variant="body2" sx={{ mb: 1, width: "170px", height: "16px", lineHeight: "15.73px" }}>Approval</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', width: "64px", height: "20px", gap: "10px" }}>
                  <Switch 
                    checked={requiresApproval}
                    onChange={(e) => setRequiresApproval(e.target.checked)}
                  />
                  <Typography variant="body2" color="text.secondary">{requiresApproval ? 'Yes' : 'No'}</Typography>
                </Box>
              </Box>
                
              <Box sx={{ width: "170px", height: "52px", gap: "16px" }}>
                <Typography variant="body2" sx={{ mb: 1, width: "170px", height: "16px", lineHeight: "15.73px" }}>Allow Recurrence</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', width: "64px", height: "20px", gap: "10px" }}>
                  <Switch 
                    checked={allowRecurrence}
                    onChange={(e) => setAllowRecurrence(e.target.checked)}
                  />
                  <Typography variant="body2" color="text.secondary">{allowRecurrence ? 'Yes' : 'No'}</Typography>
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              mt: 3,
              gap: 2
            }}>
              <Button 
                onClick={() => setOpenRoomModal(false)}
                sx={{ 
                  color: 'text.primary', 
                  textTransform: 'none',
                  px: 3
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                onClick={handleCreateRoom}
                sx={{ 
                  bgcolor: '#3182CE', 
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#2B6CB0' },
                  px: 3
                }}
              >
                Create
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );

};

export default TeamsCalendar;

