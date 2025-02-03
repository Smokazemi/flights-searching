export interface IAirport {
    skyId: string,
    entityId: string,
    presentation: {
        title: string,
        suggestionTitle: string,
        subtitle: string,
    },
    navigation: {
        entityId: string,
        entityType: string,
        localizedName: string,
        relevantFlightParams: {
            skyId: string,
            entityId: string,
            flightPlaceType: string,
            localizedName: string,
        }
        relevantHotelParams: {
            entityId: string,
            entityType: string,
            localizedName: string,
        }
    }
}
export interface IFlight {
    context: IContext;
    itineraries: IItinerary[];
    messages: unknown[]; // Use a more specific type if the structure of messages is known
    filterStats: IFilterStats;
    flightsSessionId: string;
    destinationImageUrl: string;

}

// Interfaces for the smallest nested objects
interface ICarrier {
    id: number;
    alternateId: string;
    logoUrl: string;
    name: string;
}

interface IFlightAirport {
    id: string;
    entityId: string;
    name: string;
    displayCode?: string;
    city?: string;
    country?: string;
    isHighlighted?: boolean;
}

interface IFlightPlace {
    flightPlaceId: string;
    displayCode: string;
    parent: {
        flightPlaceId: string;
        displayCode: string;
        name: string;
        type: string;
    };
    name: string;
    type: string;
    country: string;
}

interface ISegment {
    id: string;
    origin: IFlightPlace;
    destination: IFlightPlace;
    departure: string;
    arrival: string;
    durationInMinutes: number;
    flightNumber: string;
    marketingCarrier: ICarrier;
    operatingCarrier: ICarrier;
}

export interface ILeg {
    id: string;
    origin: IFlightAirport;
    destination: IFlightAirport;
    durationInMinutes: number;
    stopCount: number;
    isSmallestStops: boolean;
    departure: string;
    arrival: string;
    timeDeltaInDays: number;
    carriers: {
        marketing: ICarrier[];
        operating?: ICarrier[];
        operationType: string;
    };
    segments: ISegment[];
}

interface IPrice {
    raw: number;
    formatted: string;
    pricingOptionId: string;
}

interface IFarePolicy {
    isChangeAllowed: boolean;
    isPartiallyChangeable: boolean;
    isCancellationAllowed: boolean;
    isPartiallyRefundable: boolean;
}

interface IEco {
    ecoContenderDelta: number;
}

export interface IItinerary {
    id: string;
    price: IPrice;
    legs: ILeg[];
    isSelfTransfer: boolean;
    isProtectedSelfTransfer: boolean;
    farePolicy: IFarePolicy;
    eco?: IEco;
    fareAttributes: Record<string, unknown>;
    tags: string[];
    isMashUp: boolean;
    hasFlexibleOptions: boolean;
    score: number;
}

interface IContext {
    status: string;
    sessionId: string;
    totalResults: number;
}

interface IAirportGroup {
    city: string;
    airports: IFlightAirport[];
}

interface IDurationStats {
    min: number;
    max: number;
    multiCityMin: number;
    multiCityMax: number;
}

interface IStopPrice {
    isPresent: boolean;
    formattedPrice?: string;
}

interface IStopPrices {
    direct: IStopPrice;
    one: IStopPrice;
    twoOrMore: IStopPrice;
}

interface IFilterStats {
    duration: IDurationStats;
    airports: IAirportGroup[];
    carriers: ICarrier[];
    stopPrices: IStopPrices;
}