import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuilderPage from '@/pages/BuilderPage';
import ExportCheckPage from '@/pages/ExportCheckPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BuilderPage />} />
        <Route path="/export" element={<ExportCheckPage />} />
        <Route path="*" element={<BuilderPage />} />
      </Routes>
    </Router>
  );
}
