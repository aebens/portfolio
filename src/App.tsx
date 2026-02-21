import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';

function App() {
  return (
    <BrowserRouter basename="/portfolio">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/projects/fultonsearch"
          element={<ProjectPage project="fultonsearch" />}
        />
        <Route
          path="/projects/blacksdictionary"
          element={<ProjectPage project="blacksdictionary" />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
