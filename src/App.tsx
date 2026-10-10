import { Routes, Route, Navigate } from 'react-router-dom'
import ScrollToTop from './components/shared/ScrollToTop'
import HomePage from './pages/HomePage'
import AdvocacyPage from './pages/AdvocacyPage'
import ResearchPage from './pages/ResearchPage'
import ResumePage from './pages/ResumePage'
import EntrepreneurshipPage from './pages/EntrepreneurshipPage'
import MorePage from './pages/MorePage'

function App() {
  return (
    <div className="bg-[#0C0C0C]" style={{ overflowX: 'clip' }}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/advocacy" element={<AdvocacyPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/entrepreneurship" element={<EntrepreneurshipPage />} />
        <Route path="/more" element={<MorePage />} />
        {/* Former pages, kept as redirects so old links still resolve */}
        <Route path="/writing" element={<Navigate to="/advocacy#competition-policy" replace />} />
        <Route path="/barbering" element={<Navigate to="/entrepreneurship" replace />} />
      </Routes>
    </div>
  )
}

export default App
