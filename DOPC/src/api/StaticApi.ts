import { useQuery } from "@tanstack/react-query"

const url = 'https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-helsinki/static'

const StaticApi = () => {
    return useQuery({
        queryKey: ['coordinates'],
        queryFn: async () => {
            const res = await fetch(url, { cache: 'no-store' });
            if (!res.ok) {
                throw new Error('Failed to fetch venue data');
            }  
            const coordinates = await res.json();
            
            const venueCoordinates = coordinates.venue_raw.location.coordinates;                                    
            return {venueCoordinates};
        },
        // Optional: you can configure error handling, loading states, etc.
    });
};


export default StaticApi