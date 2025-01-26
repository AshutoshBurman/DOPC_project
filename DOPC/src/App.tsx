import CalculatorPage from './pages/CalculatorPage'
import DynamicVenueData from './api/DynamicApi';

import './App.css'

function App() {
  DynamicVenueData();


  return (
    <>
      <div>
        <CalculatorPage />
      </div>
    </>
  )
}

export default App
