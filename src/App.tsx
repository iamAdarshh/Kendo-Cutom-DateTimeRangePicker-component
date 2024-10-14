import '@progress/kendo-theme-bootstrap/dist/all.css';
import '@progress/kendo-font-icons/dist/index.css';
import './App.css';

import FlightDateTimeRangePicker, { RequestedArrivalDepartureType } from './components/FlightDateTimeRangePicker';
import { useState } from 'react';

function App() {

  const [range, setRange] = useState<{
    start?: RequestedArrivalDepartureType | null,
    end?: RequestedArrivalDepartureType | null
  }>({});

  return (
    <div className="tw-flex tw-flex-col tw-justify-center tw-my-5">

      <div className="tw-mx-auto tw-bg-white tw-shadow-lg tw-rounded tw-flex tw-flex-col tw-justify-center">

        <div className="tw-bg-sky-900 tw-rounded-t tw-p-3">
          <h2 className="tw-font-semilight tw-text-xl tw-text-neutral-100 tw-tracking-tight">Master Pricer Search</h2>
        </div>

        <div className="tw-grid tw-grid-cols-1 tw-p-5 tw-m-5">
          <div className='tw-col-span-1'>
            <FlightDateTimeRangePicker
              value={range}
              onChange={(e) => setRange({ start: e.start, end: e.end })}
            />
          </div>
        </div>

      </div>
      <pre>{JSON.stringify(range, null, 2)}</pre>
    </div>
  )
}

export default App
