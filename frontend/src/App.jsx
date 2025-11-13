import { Routes, Route } from 'react-router-dom';
import useBackendReady from './hooks/useBackendReady';
import LoadingScreen from './components/Common/LoadingScreen/LoadingScreen.jsx';
import Layout from './components/Layout/Layout';
import CustomCursor from './components/Common/CustomCursor/CustomCursor';
import Fiction from './components/Sections/Projects/Fiction';
import Spots from './components/Sections/Projects/Spots';
import Bio from './components/Sections/About/Bio';
import Skills from './components/Sections/About/Skills';
import Contact from './components/Sections/Contact/Contact';
import Login from './components/Admin/Login/Login';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const backendReady = useBackendReady([`${API_URL}/fiction`, `${API_URL}/spot`]);

  if (!backendReady) return <LoadingScreen />;

  return (
    <>
      <CustomCursor />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Fiction />
              <Spots />
              <Bio />
              <Skills />
              <Contact />
            </Layout>
          }
        />
        <Route path="/admin" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
