import React from 'react'

const PersonNew = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange, handleChangingNumber}) => {
    return (
      <form onSubmit={addPerson}>
         <h2>Add new</h2>
          <div>
            name: <input value={newName}
            onChange={handleNameChange}/>
          </div>
          <div>
            number: <input value={newNumber}
            onChange={handleNumberChange}/>
            </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }

  export default PersonNew