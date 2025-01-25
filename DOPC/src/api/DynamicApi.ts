import { useQuery } from "@tanstack/react-query"

const url = 'https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-helsinki/dynamic'

const DynamicApi =  () => {

    return useQuery({
        queryKey: ['venueData'],
        queryFn: async () => {
            const res = await fetch(url, { cache: 'no-store' });
            if (!res.ok) {
                throw new Error('Failed to fetch venue data');
            }  
            const venueData = await res.json();

                        
            const noSurCharge = venueData.venue_raw.delivery_specs.order_minimum_no_surcharge;
            const basePrice = venueData.venue_raw.delivery_specs.delivery_pricing.base_price;
            const distanceRange = venueData.venue_raw.delivery_specs.delivery_pricing.distance_ranges;
            
                                      
            return { noSurCharge, basePrice, distanceRange};
        },
        // Optional: you can configure error handling, loading states, etc.
    });
};


export default DynamicApi;