import { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import KpiStrip from './components/KpiStrip'
import MapPage from './components/MapPage'
import DistancePanel from './components/DistancePanel'
import VolumePanel from './components/VolumePanel'
import PricingPanel from './components/PricingPanel'
import ZipsDifference from './components/ZipsDifference'
import ExpansionPanel from './components/ExpansionPanel'
import RolloutTimeline from './components/RolloutTimeline'
import Footer from './components/Footer'

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [activeTab])

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'map' && <MapPage />}

      {activeTab === 'dashboard' && (
        <main>
          <Hero onOpenMap={() => setActiveTab('map')} />
          <KpiStrip />
          <DistancePanel />
          <VolumePanel />
          <PricingPanel />
          <ZipsDifference />
          <ExpansionPanel />
          <RolloutTimeline />
        </main>
      )}

      {(activeTab === 'dashboard' || activeTab === 'map') && <Footer />}
    </div>
  )
}
