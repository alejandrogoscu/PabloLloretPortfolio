import './deleteConfirm.css';

const DeleteConfirm = ({ project, category, onDelete, onCancel }) => {
  return (
    <div className="modal-delete">
      <div className="delete-icon">⚠️</div>

      <h3 className="delete-title">¿Seguro que quieres borrar este proyecto?</h3>

      <div className="delete-info">
        <p className="project-details">
          <strong>{project.title}</strong>
        </p>

        <p className="category-info">{category === 'fiction' ? 'Ficción' : 'Publicidad'}</p>
      </div>

      <div className="delete-actions">
        <button className="confirm-delete-btn" onClick={onDelete}>
          BORRAR
        </button>
        <button className="cancel-delete-btn" type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirm;
