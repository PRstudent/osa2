import React from 'react'

const Filter = ({filterName, handleFilterChange}) => {
   return (
      <div>
        filter with <input value={filterName}
        onChange={handleFilterChange} />
      </div>
   )
}

export default Filter