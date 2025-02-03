import axios from 'axios';
import { baseUrl, rapidApiKey } from './base';
import { IResponse, IResponseList } from '@/types/base';
import { IAirport, IFlight } from '@/types/IFlight';

export const searchFlights = async ({
    tripType,
    fromDate,
    toDate,
    passengers,
    cabinClass,
    origin,
    destination,
}: {
    tripType: string; // e.g., "one-way" or "round-trip"
    fromDate: string; // Departure date in YYYY-MM-DD format
    toDate?: string; // Return date in YYYY-MM-DD format (optional for one-way trips)
    passengers: {
        adults: number;
        children?: number;
        infants?: number;
    };
    cabinClass: string; // e.g., "economy", "business", "first"
    origin: IAirport;
    destination: IAirport;
}) => {
    const options = {
        method: 'GET',
        url: `${baseUrl}/v2/flights/searchFlights`,
        params: {
            originSkyId: origin.skyId, // Use the origin airport ID
            destinationSkyId: destination.skyId, // Use the destination airport ID
            originEntityId: origin.entityId, // Use the origin entity ID
            destinationEntityId: destination.entityId, // Use the destination entity ID
            cabinClass: cabinClass, // Use the provided cabin class
            adults: passengers.adults.toString(), // Number of adults
            children: passengers.children?.toString() || '0', // Number of children (optional)
            infants: passengers.infants?.toString() || '0', // Number of infants (optional)
            date: fromDate, // Departure date
            returnDate: toDate || '', // Return date (optional for one-way trips)
            sortBy: 'best', // Default sorting
            currency: 'USD', // Default currency
            market: 'en-US', // Default market
            countryCode: 'US', // Default country code
        },
        headers: {
            'x-rapidapi-key': rapidApiKey,
            'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
        },
    };

    try {
        const { data } = await axios.request<IResponse<IFlight>>(options);
        if (data.status) {
            return data.data;
        } else {
            return [];
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};
export const searchAirports = async (query: string) => {

    const options = {
        method: 'GET',
        url: `${baseUrl}/v1/flights/searchAirport`,
        params: {
            query,
            locale: 'en-US'
        },
        headers: {
            'x-rapidapi-key': rapidApiKey,
            'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
        }
    };

    try {
        const { data } = await axios.request<IResponseList<IAirport>>(options);
        if (data.status)
            return data.data
        else
            return []
    } catch (error) {
        return []
    }





}