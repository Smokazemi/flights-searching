'use client'
import React, { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Typography
} from '@mui/material';
import {
    ExpandMore,
    FlightTakeoff,
    FlightLand,
    AccessTime,
    LuggageOutlined
} from '@mui/icons-material';
import { IFlight, IItinerary, ILeg } from '@/types/IFlight';

const Flights = ({ flights }: { flights: IFlight | undefined }) => {
    if (!flights) {
        return (
            <Box className="p-4 text-center text-gray-500">
                No flights available for the selected route.
            </Box>
        );
    }

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    useEffect(() => {
        console.log(flights);
    }, [flights]);

    return (
        <Box className="w-full max-w-4xl mx-auto space-y-4 mt-8">
            {flights.itineraries.map((flight: IItinerary, index: number) => {
                const firstLeg = flight.legs[0];
                const lastLeg = flight.legs[flight.legs.length - 1];
                const totalMinutes = flight.legs.map(x => x.durationInMinutes).reduce((a, b) => a + b);

                return (
                    <Card key={index} className="shadow-md">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                className="hover:bg-gray-50"
                            >
                                <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Box className="flex flex-col">
                                            <Typography variant="h6" className="font-medium">
                                                {formatTime(firstLeg.departure)} - {formatTime(lastLeg.arrival)}
                                            </Typography>
                                            <Typography variant="body2" className="text-gray-600">
                                                {firstLeg.origin.name} - {lastLeg.destination.name}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box className="flex items-center justify-end space-x-4">
                                            <Box className="flex items-center space-x-1">
                                                <AccessTime className="w-4 h-4 text-gray-600" />
                                                <Typography variant="body2">
                                                    {formatDuration(totalMinutes)}
                                                </Typography>
                                            </Box>
                                            <Typography variant="h6" className="font-bold">
                                                {flight.price.formatted}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </AccordionSummary>

                            <AccordionDetails className="bg-gray-50">
                                <Box className="space-y-4">
                                    {flight.legs.map((segment: ILeg, segIndex: number) => (
                                        <Box key={`${index}_${segIndex}`}>
                                            {segIndex > 0 && <Divider className="my-4" />}
                                            <Box className="flex items-center space-x-2 mb-4">
                                                <FlightTakeoff className="text-blue-600" />
                                                <Typography variant="subtitle1" className="font-medium">
                                                    {segment.origin.name}
                                                </Typography>
                                                <Chip
                                                    label={segment.segments[0].operatingCarrier.name}
                                                    size="small"
                                                    variant="outlined"
                                                    className="ml-2"
                                                />
                                            </Box>

                                            <Grid container spacing={4}>
                                                <Grid item xs={12} md={6}>
                                                    <Box>
                                                        <Typography variant="body2" className="text-gray-600">
                                                            Departure
                                                        </Typography>
                                                        <Typography variant="h6">
                                                            {formatTime(segment.departure)}
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {segment.origin.name}
                                                        </Typography>
                                                        {/* <Typography variant="body2" className="text-gray-600">
                                                            Terminal {segment.segments[0].flightNumber}
                                                        </Typography> */}
                                                    </Box>
                                                </Grid>

                                                <Grid item xs={12} md={6}>
                                                    <Box>
                                                        <Typography variant="body2" className="text-gray-600">
                                                            Arrival
                                                        </Typography>
                                                        <Typography variant="h6">
                                                            {formatTime(segment.arrival)}
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {segment.destination.name}
                                                        </Typography>
                                                        {/* <Typography variant="body2" className="text-gray-600">
                                                            Terminal {segment.segments[0].flightNumber}
                                                        </Typography> */}
                                                    </Box>
                                                </Grid>
                                            </Grid>

                                            <Box className="mt-4">
                                                <Typography variant="body2" className="text-gray-600">
                                                    Duration
                                                </Typography>
                                                <Typography variant="body1">
                                                    {formatDuration(segment.durationInMinutes)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))}

                                    <Divider className="my-4" />

                                    <Box>
                                        <Typography variant="subtitle2" className="text-gray-600 mb-2">
                                            Additional Information
                                        </Typography>
                                        <Grid container spacing={4}>
                                            <Grid item xs={12} md={6}>
                                                <Box className="flex items-center space-x-2">
                                                    <LuggageOutlined className="text-gray-600" />
                                                    <Box>
                                                        <Typography variant="body2" className="font-medium">
                                                            Baggage Allowance
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            {/* {flight.} */}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Box>
                                                    <Typography variant="body2" className="font-medium">
                                                        Refundable
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {flight.farePolicy.isCancellationAllowed ? 'Yes' : 'No'}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Card>
                );
            })}
        </Box>
    );
};

export default Flights;