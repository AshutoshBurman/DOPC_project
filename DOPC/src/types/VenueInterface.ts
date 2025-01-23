export interface OpeningTimesSchedule {
    day: string;
    formatted_times: string;
  }
  
  export interface DeliveryTimesSchedule {
    day: string;
    formatted_times: string;
  }
  
  export interface DeliveryGeoRange {
    type: string;
    coordinates: number[][][];
  }
  
  export interface Merchant {
    id: string;
    name: string;
    business_id: string;
    street_address: string;
    city: string;
    post_code: string;
    country: string;
  }
  
  export interface VenueInfo {
    venue_info_service_fee_description: string | null;
    venue_info_order_minimum: string;
    venue_info_base_delivery_price: string;
  }
  
  export interface Venue {
    id: string;
    image_url: string;
    image_blurhash: string;
    name: string;
    description: string;
    rating: string | null;
    opening_times_schedule: OpeningTimesSchedule[];
    delivery_times_schedule: DeliveryTimesSchedule[];
    group_order_enabled: boolean;
    share_url: string;
    delivery_methods: string[];
    currency: string;
    address: string;
    city: string;
    country: string;
    type: string;
    timezone: string;
    delivery_base_price: number;
    delivery_geo_range: DeliveryGeoRange;
    merchant: Merchant;
    venue_info: VenueInfo;
  }
  
  export interface VenueDataResponse {
    venue: Venue;
    venue_raw: Venue;
    order_minimum: number;
  }