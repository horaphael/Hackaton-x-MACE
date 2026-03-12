import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Activities from './Activities.jsx'
import BoucanConnectHome from './Home.jsx'

function AppWrapper() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <>
      {currentPage === 'home' ? (
        <BoucanConnectHome 
          onNavigateToActivities={() => setCurrentPage('activities')}
        />
      ) : (
        <Activities 
          onBackToHome={() => setCurrentPage('home')}
        />
      )}
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)