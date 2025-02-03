'use client'
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Button,
  TextField,
  Box,
  Typography,
  Popover,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
  Autocomplete
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Plane, Calendar, Users } from 'lucide-react';
import dayjs, { Dayjs } from 'dayjs';
import { searchAirports, searchFlights } from '@/services/flight';
import { IAirport } from '@/types/IFlight';
import { IAutoCompleteOption } from '@/types/components';
import AirportAutocomplete from '../common/AirportAutocomplete';

const FlightSearchBox = ({ setFlights }: { setFlights: (i: any) => void }) => {
  const [tripType, setTripType] = useState('round');
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState('economy');
  const [origin, setOrigin] = useState<IAirport | undefined>();
  const [destination, setDestination] = useState<IAirport | undefined>();

  // Popover state
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handlePassengersClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTripTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newTripType: string,
  ) => {
    if (newTripType !== null) {
      setTripType(newTripType);
    }
  };

  const handleSearch = async () => {
    console.log({
      tripType,
      origin,
      destination,
      fromDate: fromDate?.format('YYYY-MM-DD'),
      toDate: toDate?.format('YYYY-MM-DD'),
      passengers,
      cabinClass
    });
    if (origin && destination && fromDate && toDate) {
      const data = await searchFlights({
        tripType,
        fromDate: fromDate?.format('YYYY-MM-DD'),
        toDate: toDate.format('YYYY-MM-DD'),
        passengers: {
          adults: passengers
        },
        cabinClass,
        origin,
        destination
      })
      setFlights(data)
    }
  };



  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card sx={{  margin: 'auto', mt: 2 }} className='max-w-4xl'>
        <CardContent>
          {/* Trip Type Selection */}
          <Box sx={{ mb: 3 }}>
            <ToggleButtonGroup
              value={tripType}
              exclusive
              onChange={handleTripTypeChange}
              aria-label="trip type"
            >
              <ToggleButton value="round" aria-label="round trip">
                Round Trip
              </ToggleButton>
              <ToggleButton value="one-way" aria-label="one way">
                One Way
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Search Fields Grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 2, mb: 2 }}>
            {/* Origin */}
            <AirportAutocomplete
              value={origin}
              onChange={(e) => setOrigin(e)}
              placeholder={"From"}

            />

            {/* Destination */}
            <AirportAutocomplete
              value={destination}

              onChange={(e) => setDestination(e)}
              placeholder={"To"}

            />

            {/* Departure Date */}
            <DatePicker
              label="Departure"
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Calendar size={20} />
                      </InputAdornment>
                    ),
                  }
                }
              }}
            />

            {/* Return Date */}
            {tripType === 'round' && (
              <DatePicker
                label="Return"
                value={toDate}
                onChange={(newValue) => setToDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Calendar size={20} />
                        </InputAdornment>
                      ),
                    }
                  }
                }}
              />
            )}
          </Box>

          {/* Bottom Row */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Passengers Selection */}
            <Button
              variant="outlined"
              className='h-14'
              onClick={handlePassengersClick}
              startIcon={<Users />}
            >
              {passengers} Passenger(s)
            </Button>

            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <Box sx={{ p: 2, width: 300 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">Passengers</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    >
                      -
                    </Button>
                    <Typography>{passengers}</Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setPassengers(passengers + 1)}
                    >
                      +
                    </Button>
                  </Box>
                </Box>

                <Typography variant="subtitle1">Cabin Class</Typography>
                <ToggleButtonGroup
                  value={cabinClass}
                  exclusive
                  onChange={(e, value) => value && setCabinClass(value)}
                  fullWidth
                >
                  <ToggleButton value="economy">Economy</ToggleButton>
                  <ToggleButton value="business">Business</ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Popover>

            {/* Search Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{ flexGrow: 1 }}
            >
              Search Flights
            </Button>
          </Box>
        </CardContent>
      </Card>
    </LocalizationProvider>
  );
};

export default FlightSearchBox;