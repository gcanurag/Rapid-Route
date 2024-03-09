import React from 'react'
import { locations } from "../Locations/locations";

const Select = React.forwardRef(({ endpoint,...rest }, ref) => {
  return (
    <div>
      <label htmlFor={endpoint} className="text-sm block  font-medium">
        Choose your {endpoint}
        
      </label>
      <select ref={ref}{...rest} className="w-full">
        {locations.map((location, index) => (
          <option className="" key={index} value={location.toLowerCase()}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
}
)
export default Select
