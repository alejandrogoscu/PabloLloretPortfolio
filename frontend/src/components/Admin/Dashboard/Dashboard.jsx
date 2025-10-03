import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreateEditForm from './CreateEditForm';
import DeleteConfirm from './DeleteConfirm';
import './dashboard.css';

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const navigate = useNavigate();
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
      closeModal();
    }
  };

  const editProject = async (id, data, category) => {
    setError('');
    try {
      const url = category === 'fiction' ? `${API_URL}/fiction/${id}` : `${API_URL}/ads/${id}`;
      await axios.put(url, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      fetchProjects();
      closeModal();
    } catch (error) {
      setError('Failed to edit project. Please check your data and try again');
      closeModal();
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
      closeModal();
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

      <button className="go-home-btn" onClick={() => navigate('/')}>
        Página principal
      </button>

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

              <ul className="project-list">
                {fictions.map((fiction) => (
                  <li className="project-row" key={fiction._id}>
                    <span className="project-title">{fiction.title}</span>
                    <div className="project-actions">
                      <button className="edit-btn" onClick={() => handleOpenEdit(fiction, 'fiction')}>
                        Editar
                      </button>
                      <button className="delete-btn" onClick={() => handleOpenDelete(fiction, 'fiction')}>
                        Borrar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className="accordion-section" aria-labelledby="ads-accordion">
          <button
            id="ads-accordion"
            className="accordion-toggle"
            onClick={() => setActiveAccordion(activeAccordion === 'ads' ? null : 'ads')}
            aria-expanded={activeAccordion === 'ads'}
          >
            Publicidad
          </button>

          {activeAccordion === 'ads' && (
            <div className="accordion-content">
              <button className="create-btn" onClick={() => handleOpenCreate('ads')}>
                Crear Publicidad
              </button>

              <ul className="project-list">
                {ads.map((ad) => (
                  <li className="project-row" key={ad._id}>
                    <span className="project-title">{ad.title}</span>
                    <div className="project-actions">
                      <button className="edit-btn" onClick={() => handleOpenEdit(ad, 'ads')}>
                        Editar
                      </button>
                      <button className="delete-btn" onClick={() => handleOpenDelete(ad, 'ads')}>
                        Borrar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>

      {modal.open && (
        <aside className="modal-container" aria-modal="true" role="dialog">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>
              X
            </button>

            {modal.type === 'create' && (
              <CreateEditForm category={modal.category} onSubmit={createProject} onCancel={closeModal} />
            )}

            {modal.type === 'edit' && (
              <CreateEditForm
                category={modal.category}
                initialData={modal.project}
                onSubmit={(data) => editProject(modal.project._id, data, modal.category)}
                onCancel={closeModal}
              />
            )}

            {modal.type === 'delete' && (
              <DeleteConfirm
                project={modal.project}
                category={modal.category}
                onDelete={() => deleteProject(modal.project._id, modal.category)}
                onCancel={closeModal}
              />
            )}
          </div>
        </aside>
      )}
    </main>
  );
};
export default Dashboard;
