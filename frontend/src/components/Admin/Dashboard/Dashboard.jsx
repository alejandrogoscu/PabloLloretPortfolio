import { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [fictions, setFictions] = useState([]);
  const [ads, setAds] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [modal, setModal] = useState({ open: false, type: '', project: null, category: '' });
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    setError('');
    try {
      const [fictionRes, adsRes] = await Promise.all([axios.get(`${API_URL}/fiction`), axios.get(`${API_URL}/ads`)]);
      setFictions(fictionRes.data);
      setAds(adsRes.data);
    } catch (error) {
      setError('Failed to fetch projects, Please try again later');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async (data, category) => {
    setError('');
    try {
      const url = category === 'fiction' ? `${API_URL}/fiction` : `${API_URL}/ads`;
      await axios.post(url, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      fetchProjects();
      closeModal();
    } catch (error) {
      setError('Failed to create project. Please check your data and try again');
    }
  };

  const editProject = async (id, data, category) => {
    setError('');
    try {
      const url = category === 'fiction' ? `${API_URL}/fiction` : `${API_URL}/ads`;
      await axios.post(url, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      fetchProjects();
      closeModal();
    } catch (error) {
      setError('Failed to edit project. Please check your data and try again');
    }
  };

  const deleteProject = async (id, category) => {
    setError('');
    try {
      const url = category === 'fiction' ? `${API_URL}/fiction/${id}` : `${API_URL}/ads/${id}`;
      await axios.delete(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      fetchProjects();
      closeModal();
    } catch {
      setError('Failed to delete project. Please try again.');
    }
  };

  const handleOpenCreate = (category) => {
    setModal({ open: true, type: 'create', project: null, category });
    setError('');
  };

  const handleOpenEdit = (project, category) => {
    setModal({ open: true, type: 'edit', project, category });
    setError('');
  };

  const handleOpenDelete = (project, category) => {
    setModal({ open: true, type: 'delete', project, category });
    setError('');
  };

  const closeModal = () => setModal({ open: false, type: '', project: null, category: '' });

  return (
    <main className="dashboard-container">
      <div className="section-title">
        <div className="title-line"></div>
        <h2>Admin Dashboard</h2>
        <div className="title-line"></div>
      </div>

      {error && <div className="dashboard-error">{error}</div>}
      <div className="accordion">
        <section className="accordion-section" aria-labelledby="fiction-accordion">
          <button
            id="fiction-accordion"
            className="accordion-toggle"
            onClick={() => setActiveAccordion(activeAccordion === 'fiction' ? null : 'fiction')}
            aria-expanded={activeAccordion === 'fiction'}
          >
            Ficción
          </button>

          {activeAccordion === 'fiction' && (
            <div className="accordion-content">
              <button className="create-btn" onClick={() => handleOpenCreate('fiction')}>
                Crear Ficcion
              </button>

              <ul>
                {fictions.map((fiction) => (
                  <li className="project-row" key={fiction._id}>
                    <span>{fiction.title}</span>
                    <button onClick={() => handleOpenEdit(fiction, 'fiction')}>Editar</button>
                    <button onClick={() => handleOpenDelete(fiction, 'fiction')}>Borrar</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
export default Dashboard;
