import React, { createContext, useState, ReactNode } from 'react';

interface Location {
  latitude: number;
  longitude: number;
}

interface LocationContextValue {
  location: Location;
  GetLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextValue>({
  location: { latitude: 0, longitude: 0 },
  GetLocation: async () => {},
});

interface LocationProviderProps {
  children: ReactNode;
}

const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
 
  const [location, setLocation] = useState<Location>({ latitude: 0, longitude: 0 });

  const GetLocation = async () => {
    if (navigator.geolocation) {
      try {

        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      } catch (error) {
        if (error instanceof GeolocationPositionError) {
          console.error(`Geolocation error: ${error.message}`);
        } else {
          console.error("An unexpected error occurred.");
        }
      }
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <LocationContext.Provider value={{ location, GetLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export { LocationContext, LocationProvider };