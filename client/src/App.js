import React, { useEffect, useState } from 'react'

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then( 
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <div>
      
      {(typeof backendData.objects === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        backendData.objects.map((object, i) => (
          <p key={i}>{object}</p>
        ))
      )}
    </div>
  )
}

export default App