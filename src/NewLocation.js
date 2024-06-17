import { useState } from "react"

function NewLocation(addLocation) {
    const [NewLocation, setNewLocation] = useState('')
    return (
        <>
            <h2>test</h2>
            <input
                value={NewLocation}
                onChange={(event) => setNewLocation(event.target.value)} />
            <button onClick={()=> {
                addLocation.addLocation(NewLocation)
                setNewLocation('')
                }} 
                className="btn btn-primary mt-2">Add</button>
        </>
    )
}

export default NewLocation