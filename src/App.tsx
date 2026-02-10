import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';

function App() {
  return (
    <BrowserRouter basename="/portfolio">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/projects/fultonsearch"
          element={<ProjectPage project="fultonsearch" />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
