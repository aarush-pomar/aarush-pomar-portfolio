import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/shared/ScrollToTop'
import HomePage from './pages/HomePage'
import AdvocacyPage from './pages/AdvocacyPage'
import ResearchPage from './pages/ResearchPage'
import WritingPage from './pages/WritingPage'
import ResumePage from './pages/ResumePage'
import BarberingPage from './pages/BarberingPage'
import MorePage from './pages/MorePage'

function App() {
  return (
    <div className="bg-[#0C0C0C]" style={{ overflowX: 'clip' }}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/advocacy" element={<AdvocacyPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/writing" element={<WritingPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/barbering" element={<BarberingPage />} />
        <Route path="/more" element={<MorePage />} />
      </Routes>
    </div>
  )
}

export default App
