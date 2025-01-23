import CalculatorPage from './pages/CalculatorPage'
import { LocationProvider } from './context/LocationContext'
import DynamicVenueData from './api/DynamicApi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css'

function App() {
  DynamicVenueData();


  return (
    <>
      <div>
        <LocationProvider>
          <CalculatorPage />
        </LocationProvider>
      </div>
    </>
  )
}

export default App
